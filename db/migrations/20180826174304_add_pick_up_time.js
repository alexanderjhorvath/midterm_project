
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.dateTime('pickup_time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.dropColumn('pickup_time');
  });
};
