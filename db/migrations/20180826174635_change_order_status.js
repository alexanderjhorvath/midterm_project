exports.up = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.dropColumn('order_status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.string('order_status');
  });
};
