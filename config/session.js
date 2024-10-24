const express = require('express');
const session = require('./config/session'); 
const sequelize = require('./config/connection'); 
const routes = require('./controllers'); 

const app = express();
const PORT = process.env.PORT || 3003;

// Set up middleware
app.use(session); // Use session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
