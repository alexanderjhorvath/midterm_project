
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('line_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('line_items').insert({
          order_id: 1,
          menu_item_id: 1,
          quantity: 2
        }),
        knex('line_items').insert({
          order_id: 1,
          menu_item_id: 3,
          quantity: 3
        }),
        knex('line_items').insert({
          order_id: 1,
          menu_item_id: 4,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 1,
          menu_item_id: 6,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 2,
          menu_item_id: 7,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 2,
          menu_item_id: 8,
          quantity: 2
        }),
        knex('line_items').insert({
          order_id: 2,
          menu_item_id: 2,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 3,
          menu_item_id: 5,
          quantity: 2
        }),
        knex('line_items').insert({
          order_id: 3,
          menu_item_id: 7,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 4,
          menu_item_id: 6,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 4,
          menu_item_id: 2,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 5,
          menu_item_id: 2,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 6,
          menu_item_id: 1,
          quantity: 1
        }),
        knex('line_items').insert({
          order_id: 6,
          menu_item_id: 4,
          quantity: 1
        })
      ]);
    });
};
