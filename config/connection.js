const Sequelize = require('sequelize');
require('dotenv').config(); // Make sure .env file is loaded

const sequelize = new Sequelize(
  process.env.DB_NAME,         // Database name (blogdb)
  process.env.DB_USER,         // Database user
  process.env.DB_PASSWORD,     // Database password
  {
    host: process.env.DB_HOST || 'localhost', // Default to localhost
    port: process.env.DB_PORT || 5432,        // Default port for PostgreSQL
    dialect: 'postgres',                      // Make sure you're using PostgreSQL
    dialectOptions: {
      decimalNumbers: true,                   // Optional: for handling decimal numbers
    },
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;