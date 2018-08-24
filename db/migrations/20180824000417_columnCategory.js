
exports.up = function(knex, Promise) {
  return knex.schema.table('menu_items', (table) => {
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('category');
  });
};
