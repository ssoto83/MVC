const express = require('express');
const router = express.Router();
const { User, Post } = require('../models'); 
const withAuth = require('../utils/authMiddleware');

// Home route (public)
router.get('/', (req, res) => {
    res.render('home'); // Render your home view
});

// Login route (public)
router.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard'); // Redirect logged-in users to dashboard
    }
    res.render('login'); // Render your login view
});

// Dashboard route (protected)
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        if (!userData) {
            return res.status(404).render('404'); // Render a 404 page if user not found
        }

        res.render('dashboard', { user: userData }); // Render dashboard with user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).render('error', { message: 'Server error' }); // Render an error page
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.redirect('/'); // Redirect to home after logout
    });
});

module.exports = router;
