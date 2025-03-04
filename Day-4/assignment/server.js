// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
