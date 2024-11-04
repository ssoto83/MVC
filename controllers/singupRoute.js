const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt'); 

// Sign-up route (GET)
router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup view
});

// Sign-up route (POST)
router.post('/signup', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { name, email, password } = req.body;

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Save user ID in session
        req.session.userId = newUser.id;
        req.session.logged_in = true;

        // Redirect to dashboard or home page
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).render('error', { message: 'Failed to sign up' }); // Handle error gracefully
    }
});

module.exports = router;
