const router = require("express").Router();
const { User } = require('../../models');
// const bcrypt = require('bcrypt');
// const withAuth = require('../../utils/authMiddleware'); 

// // Serve the signup form
// router.get('/signup', (req, res) => {
//     if (req.session.userId) {
//         return res.redirect('/dashboard'); // Redirect if already logged in
//     }
//     res.render('signup'); 
// });

// // Handle signup form submission
// router.post('/signup', async (req, res) => {
//     try {
//         const { username, password, email } = req.body;

//         // Check if username already exists
//         const existingUser = await User.findOne({ where: { username } });
//         if (existingUser) {
//             return res.render('signup', { message: 'Username already exists' }); // Render signup with error
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({
//             username,
//             password: hashedPassword,
//             email,
//         });

//         req.session.userId = newUser.id; // Save user ID in session
//         res.redirect('/dashboard'); // Redirect to the dashboard after signup
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).render('error', { message: 'Error creating user' }); // Render an error page
//     }
// });

// // User login
// router.get('/login', (req, res) => {
//     if (req.session.userId) {
//         return res.redirect('/dashboard'); // Redirect if already logged in
//     }
//     res.render('login'); // Render the login form
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ where: { username } });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.render('login', { message: 'Invalid credentials' }); // Render login with error
//         }

//         req.session.userId = user.id; // Save user ID in session
//         res.redirect('/dashboard'); // Redirect to the dashboard after login
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).render('error', { message: 'Error logging in' }); // Render an error page
//     }
// });

// // User logout
// router.post('/logout', (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/'); // Redirect to home after logout
//     });
// });

// // Fetch user data for the dashboard
// router.get('/api/user', withAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.userId, {
//             attributes: { exclude: ['password'] },
//         });
//         if (!userData) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(userData);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;

// Posts new user email, username, and password to database
router.post("/", async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // When user logs in as an existing user then this route validates user credentials and logs user in if a match is found in the database
  router.post("/login", async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        console.log("no user found");
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        console.log("no password match");
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: "You are now logged in!" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // When user logs out the session is ended
  router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  // Exports
  module.exports = router;