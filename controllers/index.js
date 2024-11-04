const router = require('express').Router();
const userApiRoutes = require('./userController');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postController');

router.use('/', homeRoutes);
router.use('/api/user', userApiRoutes);
router.use('/post', postRoutes);

module.exports = router;