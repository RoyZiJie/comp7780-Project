const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('./config/database');
const paypalRoutes = require('./routes/paypal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving (points to your existing files)
app.use(express.static(__dirname));

// API routes
app.use('/api/paypal', paypalRoutes);

// Get order list
app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'comp7780_home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'comp7780_home.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'comp7780_product.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`   Home page: http://localhost:${PORT}/home`);
    console.log(`   Product page: http://localhost:${PORT}/product`);
});