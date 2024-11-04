const router = require('express').Router();
const userRoutes = require('./userController');
const postRoutes = require('./postController');

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/post', postRoutes);

module.exports = router;
