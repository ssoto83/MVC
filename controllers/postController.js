const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// Create a New Post
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.update(
      { title, content },
      { where: { id: req.params.id } }
    );

    if (!updatedPost[0]) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// To delete a Post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

module.exports = router;
