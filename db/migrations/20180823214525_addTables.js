
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.dateTime('placed_at');
    table.string('order_status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};

