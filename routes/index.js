const express = require('express');
const router = express.Router();
const { User, Post } = require('../models'); // To import the models

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
      const { username, password } = req.body;
      // Hash password and create new user
      const newUser = await User.create({ username, password });
      req.session.userId = newUser.id; // Set user session
      res.redirect('/'); // Redirect to homepage
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  
  // Login route
  router.get('/login', (req, res) => {
    res.render('login'); // Render login form
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
  
      if (user && /* Check password */) {
        req.session.userId = user.id; // Set user session
        res.redirect('/'); // Redirect to homepage
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
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
