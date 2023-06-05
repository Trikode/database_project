const express = require('express');
const cors = require('cors');
const  db = require ('./db.js');

const app = express();
const port = 3308

// Parse JSON-encoded request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/users', (req, res) => {
  // Execute a MySQL query to fetch users
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Users:', results);
      res.json(results);
    }
  });
});


// Handle the POST request to the '/api/register' endpoint
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  // Perform the necessary database operations to add the user
  db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'User registered successfully' });
    }
  });
  // Respond with a success message or error message
  res.status(200).json({ message: 'User registered successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
