const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const bcrypt = require('bcrypt');

const app = express();
const port = 3308;

// Parse JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//GET
app.get('/api/users', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const results = await db.query(`
      SELECT p.*, pt.type AS type_name, s.size AS size_name, c.color AS color_name, i.image_url AS image_url, g.size AS genre_name
      FROM products p
      JOIN product_types pt ON p.id_type = pt.id_type
      JOIN sizes s ON p.size = s.id_size
      JOIN colors c ON p.color = c.id_color
      JOIN images i ON p.id_image = i.id_image
      JOIN genres g ON p.genre = g.id_genre
    `);
    const formattedResults = results.map((row) => ({
      id_product: row.id_product,
      type: row.type_name,
      name: row.name,
      size: row.size_name,
      color: row.color_name,
      genre: row.genre_name,
      quantity: row.quantity,
      price: row.price,
      image: row.image_url,
    }));
    res.json(formattedResults);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST
app.post('/api/register', async (req, res) => {
  const { f_name, l_name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (f_name, l_name, email, password, role_id) VALUES (?, ?, ?, ?, 2)',
      [f_name, l_name, email, hash]
    );
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/product', (req, res) => {
  const { type, name, size, color, genre, quantity, price, image } = req.body;

  // Insert the image URL into the images table
  db.query('INSERT INTO images (image_url) VALUES (?)', [image], (error, imageResult) => {
    if (error) {
      console.error('Error inserting image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const idImage = imageResult.insertId;

      // Insert the product into the products table
      db.query(
        `INSERT INTO products (id_type, name, size, color, genre, quantity, price, id_image)
         VALUES ((SELECT id_type FROM product_types WHERE type = ?), ?, ?, ?, ?, ?, ?, ?)`,
        [type, name, size, color, genre, quantity, price, idImage],
        (error, productResult) => {
          if (error) {
            console.error('Error inserting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'Product added successfully' });
          }
        }
      );
    }
  });
});


// PUT
app.put('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const results = await db.query('UPDATE users SET password = ? WHERE email = ?', [hash, email]);
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'Password updated successfully' });
    }
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
