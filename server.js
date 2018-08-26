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
  res.clearCookie('cookieName');
  res.render("index");
});

// Admin route
app.get('/orders_admin', (req, res) => {
  res.cookie('cookieName', 'admin');
  res.redirect('/orders');
})

// Customer route
app.get('/menu_customer', (req, res) => {
  res.cookie('cookieName', 'customer');
  res.redirect('/menu');
})


// Helper function to sort menu items based on category
function compareMenuItems(a, b) {
  const categoryA = a.category.toUpperCase();
  const categoryB = b.category.toUpperCase();
  let comparison = 0;
  if (categoryA > categoryB) {
    comparison = 1;
  } else if (categoryA < categoryB) {
    comparison = -1;
  }
  return comparison;
}


// GET - Menu page
app.get('/menu', (req, res) => {
  // Renders admin or user page based on user's cookie
  let menuArray = [];

  if (req.cookies.cookieName === 'admin') {
    dbHelpers.getItems()
    .then(function(result) {
      result.forEach(function(item) {
        menuArray.push(item);
      })
      let templateVars = { menuObj : menuArray.sort(compareMenuItems) }
      res.render('menu_admin', templateVars);
    });

  } else {
      dbHelpers.getItems()
      .then(function(result) {
        result.forEach(function(item) {
          menuArray.push(item);
      })
        let templateVars = { menuObj : menuArray.sort(compareMenuItems) }
        res.render('menu', templateVars);
      });
  }
})

function compareOrders(a, b) {
  const idA = a.id;
  const idB = b.id;
  let comparison = 0;
  if (idA > idB) {
    comparison = 1;
  } else if (idA < idB) {
    comparison = -1;
  }
  return comparison;
}

// GET - View order history

app.get('/orders', (req, res) => {
  let orderArray = [];

  if (req.cookies.cookieName === 'admin') {
    dbHelpers.getOrders('admin')
    .then(function(result) {
      result.forEach(function(item) {
        orderArray.push(item);
      })
      let templateVars = { menuObj : orderArray.sort(compareOrders) }
      res.render('orders_admin', templateVars);
    });
  } else {
    dbHelpers.getOrders(1)
    .then(function(result) {
      result.forEach(function(item) {
        orderArray.push(item);
      })
      let templateVars = { menuObj : orderArray.sort(compareOrders) }
      res.render('orders', templateVars);
    });
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

function countArrayItems(array, item) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == item) {
      count++;
    }
  }
  return count;
}
// // POST - Create order
app.post('/orders', (req, res) => {

  let user = 1;
  let timePlaced = new Date();
  let array = JSON.parse(req.body.info);
  let obj = {};
  let menuArray = [];

  array.forEach(function(item) {
    obj[item.id] = countArrayItems(array, item.id);
    menuArray.push(obj);
  })

  var keyArray = Object.keys(obj);
  let newArray = [];

  for (let i = 0; i < keyArray.length; i++) {
    let id = keyArray[i];
    let newObj = {};
    newObj['menu_item_id'] = id;
    newObj['quantity'] = obj[id];
    newArray.push(newObj);
  }

  dbHelpers.newOrder(user, timePlaced, newArray)
  res.redirect('/orders');

  // Twilio messages: 
  twilioHelper.notification('Owner', '7789772680', 'placed');
  twilioHelper.notification('Name', '7786971129', 'confirmed');
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
app.put('/orders/:id', (req, res) => {
  // twilio to confirm order status - notifies customer
  let name = req.obj.name;
  let number = req.obj.number
  let status = created;
  twilioHelper.notification(name, number, status);
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
