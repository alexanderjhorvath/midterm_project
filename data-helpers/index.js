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

const resultOfGetOrders = getOrders('admin')
console.log('Result', typeof resultOfGetOrders);

exports.getOrders = getOrders;


function getItems() {
  return knex.select('*')
    .from('menu_items')
    .then(function(rows) {
      return rows;
    })
}

exports.getItems = getItems;



// function newOrder(user, timePlaced, orderArray) {
//   knex('orders')
//     .insert({ user_id: user,
//        date: timePlaced,
//        time: timeplaced
//      })
//     .returning('id')
//     .then(function(id){
//       return knex.insert({order_id: id,
//         menu_item_id: orderArray[0],
//         quantity: orderArray[1]}).into('line_items');
//     });

// }

// newOrder();

/*

menu page SELECT display all items
 - Cart -
menu page SELECT admin all items + UPDATE/delete
orders user SELECT list of all orders by their id sorted into current and past
orders admin SELECT list of all orders sorted into current and past AND UPDATE

*/
