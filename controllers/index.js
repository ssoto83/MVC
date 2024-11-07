const router = require('express').Router();
// const userApiRoutes = require('./userController');
const homeRoutes = require('./homeRoutes');
// const postRoutes = require('./postController');
const apiRoutes = require("./api");

router.use('/', homeRoutes);
// router.use('/api/user', userApiRoutes);
// router.use('/post', postRoutes);
router.use("/api", apiRoutes);

// Default catch-all (optional, but useful for handling undefined routes)
router.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });
  

module.exports = router;