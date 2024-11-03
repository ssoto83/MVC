const express = require('express');
const router = express.Router();
const { User, Post } = require('../models'); // To import the models
const withAuth = require("../utils/authMiddleware")
// Render the homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(); // Get all posts
    res.render('home', { posts }); // Render the homepage with posts
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// Sign up route
router.get('/signup', (req, res) => {
  res.render('signup'); // Render signup form
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hash password and create new user
    const newUser = await User.create({ email, password });
    req.session.userId = newUser.id; // Set user session
    res.redirect('/'); // Redirect to homepage
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const posts = await Post.findAll({ where: { user_id: userId } }); // Get user posts
    res.render('dashboard', { posts }); // Render dashboard with user's posts
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});
// Post route
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.render('postDetail', { post }); // Render post detail page
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.redirect('/'); // Redirect to homepage
});


module.exports = router; // Router export
