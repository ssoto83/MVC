const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/authMiddleware');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Error fetching posts' }); // Render an error page
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    if (!postData) {
      return res.status(404).render('404'); // Render 404 page if post not found
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).render('error', { message: 'Error fetching post' }); // Render an error page
  }
});

// Profile route - protected
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Check if the user exists
    if (!userData) {
      return res.status(404).render('404'); // Render 404 page if user not found
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).render('error', { message: 'Error fetching profile' }); // Render an error page
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to profile
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login'); // Render login page
});

module.exports = router;