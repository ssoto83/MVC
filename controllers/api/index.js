// const router = require('express').Router();
// const userRoutes = require('./userController');
// const postRoutes = require('./postRoute');

// router.use('/', homeRoutes);
// router.use('/', userRoutes);
// router.use('/post', postRoutes);

// module.exports = router;

// Imports
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const PostRoutes = require("./PostRoutes");
const commentRoutes = require("./commentRoutes");

// Middleware
router.use("/users", userRoutes);
router.use("/Post", PostRoutes);
router.use("/comment", commentRoutes);

// Exports
module.exports = router;