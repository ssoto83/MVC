const sequelize = require('../config/connection');
const { User, Post } = require('../models'); // Adjust based on your model exports

const userData = [
    {
        username: 'Susan Soto',
        email: 'susans@email.com',
        password: 'password123',
    },
    {
        username: 'Milo Soto',
        email: 'Msoto@email.com',
        password: 'password456',
    },
    {
        username: 'Sabrina Soto',
        email: 'sabrina13@email.com',
        password: 'password789',
    }, 
    {
        username: 'Selena Soto',
        email: 'selena21@email.com',
        password: 'password000',
    },
];

const postData = [
    {
        title: 'Testing testing',
        content: 'Test #1!',
        user_id: 1, // Assuming this corresponds to Susana Soto
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

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them

    // Create users
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create posts
    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    console.log('Seeding complete!');
    process.exit(0);
};

seedDatabase();
