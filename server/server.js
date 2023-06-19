const express = require('express');
const cors = require('cors');
const  db = require ('./db.js');
const bcrypt = require('bcrypt');


const app = express();
const port = 3308

// Parse JSON-encoded request bodies
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

//GET
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // console.log('Users:', results);
      res.json(results);
    }
  });
});

app.get('/api/products', (req, res) => {
  db.query(`
    SELECT p.*, pt.type AS type_name, s.size AS size_name, c.color AS color_name, i.image_url AS image_url, g.size AS genre_name
    FROM products p
    JOIN product_types pt ON p.id_type = pt.id_type
    JOIN sizes s ON p.size = s.id_size
    JOIN colors c ON p.color = c.id_color
    JOIN images i ON p.id_image = i.id_image
    JOIN genres g ON p.genre = g.id_genre
  `, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
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
    }
  });
});




// POST
app.post('/api/register', (req, res) => {
  const { f_name, l_name, email, password } = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      db.query(
        'INSERT INTO users (f_name, l_name, email, password, role_id) VALUES (?, ?, ?, ?, 2)',
        [f_name, l_name, email, hash],
        (error, results) => {
          if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'User registered successfully' });
          }
        }
      );
    }
  });
});


// PUT
app.put('/api/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  bcrypt.hash(newPassword, 10, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      db.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.json({ message: 'Password updated successfully' });
        }
      });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});