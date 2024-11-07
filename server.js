const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3010;

// Custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SESSION_SECRET || 'secretshh',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use true in production
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Syncs sequelize with database
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.log('Error syncing database:', err);
  });
