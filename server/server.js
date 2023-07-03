const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const bcrypt = require("bcrypt");

const app = express();
const port = 3308;

// Parse JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//GET
app.get("/api/users", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/products", async (req, res) => {
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
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/sizes", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM sizes");
    res.json(results);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ error: "Error fetching sizes" });
  }
});

app.get("/api/colors", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM colors");
    res.json(results);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Error fetching colors" });
  }
});

app.get("/api/deliveries", async (req, res) => {
  try {
    const results = await db.query(`
      SELECT d.*, c.city
      FROM deliveries AS d
      JOIN cities AS c ON d.city = c.id_city
    `);

    res.json(results);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ error: "Error fetching deliveries" });
  }
});

app.get("/api/carts", async (req, res) => {
  const userId = req.query.userId;
  try {
    const results = await db.query(
      "SELECT c.id_cart, p.name, p.price, c.quantity FROM carts c JOIN products p ON c.id_product = p.id_product WHERE c.id_user = ?",
      [userId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Error fetching carts" });
  }
});


// GET per i contenuti più visitati (ARES)
app.get('/api/most-visited', (req, res) => {
  // Query SQL per selezionare i contenuti più visualizzati
  const sqlQuery = 'SELECT * FROM users ORDER BY visit_count DESC LIMIT 10';

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei contenuti più visitati.' });
    } else {
      res.json(results);
    }
  });
});


// POST
app.post("/api/register", async (req, res) => {
  const { f_name, l_name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (f_name, l_name, email, password, role_id) VALUES (?, ?, ?, ?, 2)",
      [f_name, l_name, email, hash]
    );
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post('/api/newproduct', async (req, res) => {
//   const { type, name, sizes, colors, genre, quantity, price, image } = req.body;

//   try {
//     // Insert the image URL into the images table
//     await db.query('INSERT INTO images (image_url) VALUES (?)', [image]);

//     // Retrieve the inserted image's id_image
//     const imageQueryResult = await db.query('SELECT LAST_INSERT_ID() AS id_image');
//     const idImage = imageQueryResult[0].id_image;
//     console.log(sizes)
//     console.log(typeof(sizes))
//     console.log(colors)
//     console.log(typeof(colors))
//     // Insert the products into the products table
//     for (const size of sizes) {
//       for (const color of colors) {
//         await db.query(
//           'INSERT INTO products (id_type, name, size, color, genre, quantity, price, id_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//           [type, name, size, color, genre, quantity, price, idImage]
//         );
//       }
//     }

//     res.json({ message: 'Product(s) inserted successfully' });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.post("/api/newproduct", async (req, res) => {
  const { type, name, size, color, genre, quantity, price, image } = req.body;
  try {
    let idImage;
    const existingImageQuery = await db.query(
      "SELECT id_image FROM images WHERE image_url = ?",
      [image]
    );

    if (existingImageQuery.length > 0) {
      idImage = existingImageQuery[0].id_image;
    } else {
      await db.query("INSERT INTO images (image_url) VALUES (?)", [image]);

      const imageQueryResult = await db.query(
        "SELECT LAST_INSERT_ID() AS id_image"
      );
      idImage = imageQueryResult[0].id_image;
    }

    await db.query(
      "INSERT INTO products (id_type, name, size, color, genre, quantity, price, id_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [type, name, size, color, genre, quantity, price, idImage]
    );

    res.json({ message: "Product inserted successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST
app.post("/api/addtocart", async (req, res) => {
  const { id_user, id_product, quantity } = req.body;
  try {
    await db.query(
      "INSERT INTO carts (id_user, id_product, quantity) VALUES (?, ?, ?)",
      [id_user, id_product, quantity]
    );
    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Conteggio delle visualizzazioni (ARES)
app.post('/api/content/:id/visit', (req, res) => {
  const contentId = req.params.id;

  // Questo incrementa il conteggio delle visualizzazioni
  const sqlQuery = `UPDATE users SET visit_count = visit_count + 1 WHERE id_user = ${contentId}`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante in aggiornamento delle visite.' });
    } else {
      res.sendStatus(200);
    }
  });
});

// PUT
app.put("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const results = await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hash, email]
    );
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
