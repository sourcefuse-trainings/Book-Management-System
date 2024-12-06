// Importing Express
const express = require('express');
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Importing routes
const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong!" });
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
