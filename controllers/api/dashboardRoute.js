const express = require('express');
const router = express.Router();
const { User, Post } = require('../../models'); 
const withAuth = require('../../utils/authMiddleware');

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

        const user = userData.get({ plain: true }); // Serialize user data
        res.render('dashboard', { user }); // Render dashboard with user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).render('error', { message: 'Server error' }); // Render an error page
    }
});

// Login route (handles POST request)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; // Assuming form sends username and password

        // Look up user in database
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).render('login', { message: 'User not found!' }); // Handle invalid user
        }

        // Compare passwords (make sure to use a proper password check, e.g., bcrypt)
        const validPassword = await user.checkPassword(password); // Assuming `checkPassword` method exists

        if (!validPassword) {
            return res.status(400).render('login', { message: 'Invalid credentials!' }); // Handle invalid password
        }

        // Store user ID in session to track logged-in user
        req.session.userId = user.id;

        // Redirect to dashboard upon successful login
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).render('error', { message: 'Server error during login' });
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
