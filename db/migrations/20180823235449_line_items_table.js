
exports.up = function(knex, Promise) {
  return knex.schema.createTable('line_items', (table) => {
    table.increments();
    table.integer('order_id').references('orders.id').onDelete('CASCADE');
    table.integer('menu_item_id').references('menu_items.id').onDelete('CASCADE');
    table.integer('quantity');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('line_items');
};
