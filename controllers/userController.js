const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Serve the signup form
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Handle signup form submission
router.post('/signup', async (req, res) => {
  try {
      const { username, password, email } = req.body;

      // Check if username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
          username,
          password: hashedPassword,
          email,
      });

      req.session.userId = newUser.id; // Save user ID in session
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Error creating user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.id; // Save user ID in session
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
