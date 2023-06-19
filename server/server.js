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


//POST
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
     
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {

      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'User registered successfully' });
        }
      });
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