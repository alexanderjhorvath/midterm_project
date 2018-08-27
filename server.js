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

// HELPER FUNCTION to compare orders based on id
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
  let orderDetailsArray = [];
  let templateVars = {};

  if (req.cookies.cookieName === 'admin') {
    return Promise.all([
      dbHelpers.getOrderDetails(req.cookies.cookieName),
      dbHelpers.getOrders(req.cookies.cookieName)
    ]).then(function(result) {
      result[0].forEach(function(item) {
        orderDetailsArray.push(item);
      })
      templateVars.orderDetailsObj = orderDetailsArray.sort(compareOrders);
      result[1].forEach(function(item) {
        orderArray.push(item);
      })
      templateVars.orderObj = orderArray.sort(compareOrders);
      res.render('orders_admin', templateVars);
    })
  } else {
    return Promise.all([
      dbHelpers.getOrderDetails(1),
      dbHelpers.getOrders(1)
    ]).then(function(result) {
      result[0].forEach(function(item) {
        orderDetailsArray.push(item);
      })
      templateVars.orderDetailsObj = orderDetailsArray.sort(compareOrders);
      result[1].forEach(function(item) {
        orderArray.push(item);
      })
      templateVars.orderObj = orderArray.sort(compareOrders);
      res.render('orders', templateVars);
    })
  }
});

// PUT - Update inventory

app.post('/menu', (req, res) => {
  let name = req.body.name;
  let cost = Number(req.body.cost);
  let costDecimal = Number.parseFloat(cost).toFixed(2);
  let price = Number(req.body.price);
  let priceDecimal = Number.parseFloat(price).toFixed(2);
  let description = req.body.description;
  let url = req.body.url;
  let inventory = Number(req.body.quantity);
  let category = req.body.category;

  dbHelpers.addMenuItem(name, costDecimal, priceDecimal, description, url, inventory, category)
  .then(function(result) {
    res.redirect('/menu');
  })
})

// HELPER FUNCTION to return the count of an item in an array
function countArrayItems(array, item) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == item) {
      count++;
    }
  }
  return count;
}
// POST - Create order
app.post('/orders', (req, res) => {
  // Twilio messages:
  twilioHelper.noTimeNotification('Owner', '7789772680', 1);

  let user = 1; // Test user
  let timePlaced = new Date(); // Timestamp of when order is placed
  let array = JSON.parse(req.body.info);
  let obj = {};
  let menuArray = [];

  // Looping through req.body array, and pushing objects containing id and quantity
  array.forEach(function(item) {
    obj[item.id] = countArrayItems(array, item.id);
    menuArray.push(obj);
  })

  var keyArray = Object.keys(obj);
  let newArray = [];

  // Formatting array of objects to include descriptive keys
  for (let i = 0; i < keyArray.length; i++) {
    let id = keyArray[i];
    let newObj = {};
    newObj['menu_item_id'] = id;
    newObj['quantity'] = obj[id];
    newArray.push(newObj);
  }

  dbHelpers.newOrder(user, timePlaced, newArray)
  .then(function(result) {
    res.redirect('/orders');
  })
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


app.post('/orders/status', (req, res) => {
  // Takes order ID submitted in request to access correct order in database
  let orderId = req.body.orderId;
  // If time information is sent in request, update pickup time in database
  if (req.body.time) {
    // Converting to number
    let readyMinutes = Number(req.body.time);
    // Getting current time
    let timeStamp = new Date();
    // Adding minutes to current time to calculate pickup time
    timeStamp.setMinutes(timeStamp.getMinutes() + readyMinutes);

    return Promise.all([
      dbHelpers.updateStatus(orderId),
      dbHelpers.updatePickupTime(orderId, timeStamp),
      dbHelpers.getStatus(orderId)
    ])
    .then(function(result) {
      twilioHelper.notification('Jamie', '7786971129', result[2][0].order_status, readyMinutes);
      res.redirect('/orders');
    })
  } else { // if no time information is sent in request:
    return Promise.all([
      dbHelpers.updateStatus(orderId),
      dbHelpers.getStatus(orderId)
  ]).then(function(result) {
      twilioHelper.noTimeNotification('Jamie', '7786971129', result[1][0].order_status);
      res.redirect('/orders');
    })
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
