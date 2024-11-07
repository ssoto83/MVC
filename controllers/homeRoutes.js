const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/authMiddleware');

// router.get('/', async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('home', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).render('error', { message: 'Error fetching posts' }); // Render an error page
//   }
// });

// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });
//     if (!postData) {
//       return res.status(404).render('404'); // Render 404 page if post not found
//     }

//     const post = postData.get({ plain: true });

//     res.render('post', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     console.error('Error fetching post:', err);
//     res.status(500).render('error', { message: 'Error fetching post' }); // Render an error page
//   }
// });

// // Profile route - protected
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.userId, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     // Check if the user exists
//     if (!userData) {
//       return res.status(404).render('404'); // Render 404 page if user not found
//     }

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     console.error('Error fetching user profile:', err);
//     res.status(500).render('error', { message: 'Error fetching profile' }); // Render an error page
//   }
// });

// // Login route
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect to profile
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login'); // Render login page
// });

// module.exports = router;

router.get("/", async (req, res) => {
  try {
    // Get all Posts and JOIN with user data and comment data
    const PostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });

    // Serialize data so the template can read it
    const Posts = PostData.map((Post) =>
      Post.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("homepage", {
      Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route set up to find single blog post and render Post page
router.get("/Post/:id", withAuth, async (req, res) => {
  try {
    const PostData = await Post.findByPk(req.params.id, {
      // Join user data and comment data with blog post data
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const Post = PostData.get({ plain: true });
    console.log(Post);

    res.render("Post", {
      ...Post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    res.redirect("/login");
  }
});

// route to allow logged in user access to the dashboard page
// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // Join user blog post and comment data with user data
      include: [
        {
          model: Post,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// NEW POST PAGE: Renders 'create.handlebars'; redirects to /login if not logged in
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route set up to be able to edit an existing blog post
router.get("/create/:id", async (req, res) => {
  try {
    const PostData = await Post.findByPk(req.params.id, {
      // Join user data and comment data with blog post data
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const Post = PostData.get({ plain: true });
    console.log(Post);

    if (req.session.logged_in) {
      res.render("edit", {
        ...Post,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.all("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// Export
module.exports = router;