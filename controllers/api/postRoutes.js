const router = require("express").Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/authMiddleware'); // Import the middleware

// // Get All Posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.findAll();
//     res.json(posts);
//   } catch (error) {
//     console.error('Error retrieving posts:', error);
//     res.status(500).json({ message: 'Error retrieving posts' });
//   }
// });

// // Get a specific Post by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(post);
//   } catch (error) {
//     console.error('Error retrieving post:', error);
//     res.status(500).json({ message: 'Error retrieving post' });
//   }
// });

// // Create a New Post
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const newPost = await Post.create({
//       title,
//       content,
//       user_id: req.session.userId, // Associate with logged-in user
//     });
//     res.status(201).json(newPost); // Return the newly created post
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Error creating post' });
//   }
// });

// // Update a Post
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { title, content } = req.body;

//     const post = await Post.findByPk(postId);

//     // Check if the post exists and belongs to the user
//     if (!post || post.user_id !== req.session.userId) {
//       return res.status(403).json({ message: 'You do not have permission to update this post.' });
//     }

//     await Post.update(
//       { title, content },
//       { where: { id: postId } }
//     );

//     res.status(200).json({ message: 'Post updated successfully' }); // Indicate successful update
//   } catch (error) {
//     console.error('Error updating post:', error);
//     res.status(500).json({ message: 'Error updating post' });
//   }
// });

// // Delete a Post
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const post = await Post.findByPk(postId);

//     // Check if the post exists and belongs to the user
//     if (!post || post.user_id !== req.session.userId) {
//       return res.status(403).json({ message: 'You do not have permission to delete this post.' });
//     }

//     await Post.destroy({ where: { id: postId } });
//     res.status(204).send(); // No content to send back
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     res.status(500).json({ message: 'Error deleting post' });
//   }
// });

// module.exports = router;

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// Route to edit an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const PostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;