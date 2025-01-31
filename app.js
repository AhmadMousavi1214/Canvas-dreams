const express = require('express');
const app = express();
const db = require('./config/database');

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const paintingRoutes = require('./src/routes/paintingRoutes');

// Middleware
app.use(express.json());

// Use routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/paintings', paintingRoutes);

// Test database connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Start the server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
