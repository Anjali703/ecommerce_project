const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory "database" for products and users
const products = [
    { id: 1, name: 'Wireless Mouse', price: 25.99, imageUrl: 'https://placehold.co/400x300/007bff/ffffff?text=Mouse' },
    { id: 2, name: 'Mechanical Keyboard', price: 79.99, imageUrl: 'https://placehold.co/400x300/28a745/ffffff?text=Keyboard' },
    { id: 3, name: 'Webcam 1080p', price: 45.00, imageUrl: 'https://placehold.co/400x300/dc3545/ffffff?text=Webcam' },
    { id: 4, name: '27-inch Monitor', price: 199.99, imageUrl: 'https://placehold.co/400x300/ffc107/000000?text=Monitor' },
    { id: 5, name: 'Gaming Headset', price: 55.50, imageUrl: 'https://placehold.co/400x300/17a2b8/ffffff?text=Headset' },
];

const users = []; // User data will be stored here

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API endpoint for a mock checkout process
app.post('/api/checkout', (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No items provided for checkout.' });
    }

    console.log('Received checkout request for items:', items);

    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Checkout successful!', orderId: `ORD-${Date.now()}` });
    }, 1000);
});

// API endpoint for user registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    const newUser = { username, email, password };
    users.push(newUser);
    console.log('New user registered:', newUser);
    res.status(201).json({ success: true, message: 'Registration successful!' });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log('User logged in:', user.email);
        res.status(200).json({ success: true, message: 'Login successful!', user: { username: user.username, email: user.email } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
});

app.listen(port, () => {
    console.log(`E-commerce backend running at http://localhost:${port}`);
});