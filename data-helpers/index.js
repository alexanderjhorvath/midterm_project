
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

exports = module.exports;

function getOrders(user) {
  if (user === 'admin') {
    return knex.select(
    'orders.time',
    'users.name AS username',
    'users.phone_number',
    'users.email',
    'menu_items.name',
    'menu_items.price',
    'line_items.quantity',
    'orders.order_status'
    )
    .from('orders')
    .leftJoin('users', 'orders.user_id', 'users.id')
    .leftJoin('line_items', 'orders.id', 'line_items.order_id')
    .leftJoin('menu_items', 'line_items.menu_item_id', 'menu_items.id')
    .then(function(rows) {
      console.log(rows);
      return rows;
    })
  } else {
    return knex.select(
    'orders.time',
    'menu_items.name',
    'menu_items.price',
    'line_items.quantity',
    'orders.order_status'
    )
    .from('orders')
    .where({'user_id': user})
    .leftJoin('line_items', 'orders.id', 'line_items.order_id')
    .leftJoin('menu_items', 'line_items.menu_item_id', 'menu_items.id')
    .then(function(rows) {
      return rows;
    })
  }
}

exports.getOrders = getOrders;


function getItems() {
  return knex.select('*')
    .from('menu_items')
    .then(function(rows) {
      console.log("Type of rows = ", typeof rows);
      return rows;
    })
}

exports.getItems = getItems;


const order1 = [{menu_item_id: 7, quantity: 3}, {menu_item_id: 3, quantity: 2}];

function newOrder(user, timePlaced, lineItems) {
  return knex.insert({
    user_id: user,
    time: timePlaced,
    order_status: "Placed"
  })
  .returning('id')
  .into('orders')
  .then(function([id]){
    const lineItemsWithId = lineItems.map(lineItem => {
      lineItem.order_id = id;
      return lineItem;
    });
    return knex.insert(lineItemsWithId).into('line_items');
  });
}

newOrder(2, '2018-08-24T14:39:07.318Z', order1);

/*

menu page SELECT display all items
 - Cart -
menu page SELECT admin all items + UPDATE/delete
orders user SELECT list of all orders by their id sorted into current and past
orders admin SELECT list of all orders sorted into current and past AND UPDATE

Placed
In Progress
Ready
Picked up

*/
