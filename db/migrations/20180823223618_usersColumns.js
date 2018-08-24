exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('email');
    table.string('phone_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('email');
    table.dropColumn('phone_number');
  });
};
