
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.integer('order_status').defaultTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.dropColumn('order_status');
  });
};


/*
Order Status
1 - placed
2 - in progress
3 - ready for pick-up
4 - picked up
*/
