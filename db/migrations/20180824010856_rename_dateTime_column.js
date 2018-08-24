
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.renameColumn('placed_at', 'time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', (table) => {
    table.renameColumn('time', 'placed_at');
  });
};
