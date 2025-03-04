// Import express and cors
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 3001;  // Backend server will run on this port

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cors());  // Enable CORS for cross-origin requests

// Sample user data
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

// GET endpoint to retrieve users
app.get('/users', (req, res) => {
  res.json(users);  // Send the users list as JSON
});

// POST endpoint to add a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
