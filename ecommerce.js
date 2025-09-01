// =================================================================================
// ecommerce.js (Backend)
//
// This is a simple Node.js/Express server that acts as the backend for the
// e-commerce site. It provides a list of products and a mock checkout endpoint.
//
// To run this file:
// 1. Make sure you have Node.js and npm installed.
// 2. In your terminal, run `npm init -y` to create a package.json file.
// 3. Install the required dependencies: `npm install express cors`
// 4. Run the server: `node ecommerce.js`
// 5. The server will be running on http://localhost:3000
// =================================================================================
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// In-memory "database" for products
const products = [
    { id: 1, name: 'Wireless Mouse', price: 25.99, imageUrl: 'https://placehold.co/400x300/007bff/ffffff?text=Mouse' },
    { id: 2, name: 'Mechanical Keyboard', price: 79.99, imageUrl: 'https://placehold.co/400x300/28a745/ffffff?text=Keyboard' },
    { id: 3, name: 'Webcam 1080p', price: 45.00, imageUrl: 'https://placehold.co/400x300/dc3545/ffffff?text=Webcam' },
    { id: 4, name: '27-inch Monitor', price: 199.99, imageUrl: 'https://placehold.co/400x300/ffc107/000000?text=Monitor' },
    { id: 5, name: 'Gaming Headset', price: 55.50, imageUrl: 'https://placehold.co/400x300/17a2b8/ffffff?text=Headset' },
];

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    // Return the list of products as a JSON response
    res.json(products);
});

// API endpoint for a mock checkout process
app.post('/api/checkout', (req, res) => {
    const { items } = req.body;

    // A simple validation for the request body
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No items provided for checkout.' });
    }

    console.log('Received checkout request for items:', items);

    // Simulate a successful transaction
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Checkout successful!', orderId: `ORD-${Date.now()}` });
    }, 1000); // Simulate a network delay
});

// Start the server
app.listen(port, () => {
    console.log(`E-commerce backend running at http://localhost:${port}`);
});
