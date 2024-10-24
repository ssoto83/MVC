// utils/authMiddleware.js
const { User } = require('../models');

// To protect routes that require authentication
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

module.exports = withAuth;
