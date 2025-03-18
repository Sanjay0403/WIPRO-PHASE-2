const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors()); // Allow requests from different origins (useful for React)

// Sample list of users
let users = [{ name: 'John Doe' }, { name: 'Jane Doe' }];

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to add a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  users.push({ name });
  res.status(201).json({ name });
});

// Set the server to listen on port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
