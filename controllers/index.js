const router = require('express').Router();

const userRoutes = require('./userController');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postController');

router.use('/', homeRoutes);
router.use(userRoutes);
router.use('/post', postRoutes);

module.exports = router;