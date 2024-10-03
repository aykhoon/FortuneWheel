const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const USERS_FILE = 'users.txt';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to handle user registration
app.post('/register', (req, res) => {
    const { username } = req.body;

    console.log('Received username:', username); // Debugging step

    // Check if username exists
    if (!username) {
        console.log('Username is missing');
        return res.status(400).json({ message: 'Username is required' });
    }

    // Read the existing users from the txt file
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        users = fs.readFileSync(USERS_FILE, 'utf8').split('\n').filter(Boolean);
        console.log('Existing users:', users); // Debugging step
    }

    // Check if the username is already taken
    if (users.includes(username)) {
        console.log('Username already taken');
        return res.status(409).json({ message: 'Username already taken' });
    }

    // Append the new username to users.txt
    fs.appendFile(USERS_FILE, `${username}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('User registered successfully:', username); // Debugging step
        return res.status(201).json({ message: 'User registered successfully' });
    });
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Check if username exists
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Read the existing users from the txt file
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        users = fs.readFileSync(USERS_FILE, 'utf8').split('\n').filter(Boolean);
    }

    // Check if the username exists
    if (!users.includes(username)) {
        return res.status(404).json({ message: 'Username not found' });
    }

    return res.status(200).json({ message: 'Login successful' });
});

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
