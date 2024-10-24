const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const withAuth = require('../utils/authMiddleware'); // Import the middleware

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// To create a New Post
router.post('/', withAuth, async (req, res) => {
    try {
      const { title, content } = req.body;
      const newPost = await Post.create({
        title,
        content,
        user_id: req.session.userId, // Associate with logged-in user
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  });

// To update a Post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
  
      const post = await Post.findByPk(postId);
  
      // Check if the post exists and belongs to the user
      if (!post || post.user_id !== req.session.userId) {
        return res.status(403).json({ message: 'You do not have permission to update this post.' });
      }
  
      const updatedPost = await Post.update(
        { title, content },
        { where: { id: postId } }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post' });
    }
  });

// To delete a Post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postId = req.params.id;
  
      const post = await Post.findByPk(postId);
  
      // Check if the post exists and belongs to the user
      if (!post || post.user_id !== req.session.userId) {
        return res.status(403).json({ message: 'You do not have permission to delete this post.' });
      }
  
      await Post.destroy({ where: { id: postId } });
      res.status(204).send(); // No content to send back
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post' });
    }
  });
  
module.exports = router;
