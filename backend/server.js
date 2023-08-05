
const express = require('express');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');
const createConnection = require('./model/config');
// const User = require('.model/userModel');
// const comment = require('.model/commentModel');

const cors = require('cors');
require("dotenv").config();
const app = express();
createConnection()
// Middlewares
app.use(cors());
app.use(express.json());

;

// Routes
app.use('/auth', authRoutes);
app.use('/api', commentRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
