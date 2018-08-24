"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const cookieParser = require("cookie-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const twilioHelper = require('./routes/twilio.js');
const dbHelpers = require('./data-helpers/index.js')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieParser());

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  // twilioHelper.notification('Jamie', '7786971129', 'ready');
  res.clearCookie('cookieName');
  res.render("index");

});

// Admin route
app.get('/menu_admin', (req, res) => {
  res.cookie('cookieName', 'admin');
  res.redirect('/menu');
})

// Customer route
app.get('/menu_customer', (req, res) => {
  res.cookie('cookieName', 'customer');
  res.redirect('/menu');
})

// GET - Menu page
app.get('/menu', (req, res) => {
  dbHelpers.getItems();
  // Renders admin or user page based on user's cookie
  if (req.cookies.cookieName === 'admin') {
    res.render('menu_admin');
  } else {
    res.render('menu');
  }
})

// Add item to cart
app.put('/cart', (req, res) => {
})

// PUT - Update inventory
app.put('/menu')

// GET - User reviews order before submitting
app.get('/confirmation', (req, res) => {
  res.render('confirmation');
})


// POST - Create order
app.post('/orders', (req, res) => {
 // Passes in order array
})

// GET - View order history
app.get('/orders', (req, res) => {
  if (req.cookies.cookieName === 'admin') {
    res.render('orders_admin');
  } else {
    res.render('orders');
  }
})

// PUT - Owner updates order status
app.put('/orders/:id')


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
