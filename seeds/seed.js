const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Adjust based on your model exports

const userData = [
    {
        name: 'Susan Soto',
        email: 'susans@email.com',
        password: 'password123',
    },
    {
        name: 'Milo Soto',
        email: 'Msoto@email.com',
        password: 'password456',
    },
    {
        name: 'Sabrina Soto',
        email: 'sabrina13@email.com',
        password: 'password789',
    }, 
    {
        name: 'Selena Soto',
        email: 'selena21@email.com',
        password: 'password000',
    },
];

const postData = [
    {
        title: 'Testing testing',
        content: 'Test #1!',
        user_id: 1, // This corresponds to Susana Soto
    },
    {
        title: 'Second test',
        content: 'Test #2',
        user_id: 2, // This corresponds to Milo Soto
    },
    {
        title: 'Third Post',
        content: 'This is test #3.',
        user_id: 3, // This corresponds to Sabrina Soto
    },
    {
        title: 'Final test',
        content: '#4 and final test.',
        user_id: 4, // This corresponds to Selena Soto
    },
];
const commentData = [
    {
        content: 'Great post!',
        user_id: 1, // Comment by Susan Soto
        post_id: 1, // Comment on Testing testing
    },
    {
        content: 'Thanks for sharing!',
        user_id: 2, // Comment by Milo Soto
        post_id: 1, // Comment on Testing testing
    },
    {
        content: 'Interesting read!',
        user_id: 3, // Comment by Sabrina Soto
        post_id: 2, // Comment on Second test
    },
    {
        content: 'Looking forward to more posts!',
        user_id: 4, // Comment by Selena Soto
        post_id: 3, // Comment on Third Post
    },
    {
        content: 'Nice work!',
        user_id: 1, // Comment by Susan Soto
        post_id: 4, // Comment on Final test
    },
];

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // Drop existing tables and recreate them

    // Create users
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create posts
    const createdPosts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    // Create comments
    await Comment.bulkCreate(commentData);

    console.log('Seeding complete!');
    process.exit(0);
};

seedDatabase();