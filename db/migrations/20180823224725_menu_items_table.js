
exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', (table) => {
    table.increments();
    table.string('name');
    table.decimal('cost');
    table.decimal('price');
    table.text('description');
    table.string('image_url', [512]);
    table.integer('inventory');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
