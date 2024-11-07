const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Adjust based on your model exports

const userData = require("./userData.json");
const PostData = require("./PostData.json");
const commentData = require("./commentData.json");

// Seeds database with user data, Post data, and comment data
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const Post of PostData) {
        await Post.create({
            ...Post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);
};

// Function call to seed database
seedDatabase();