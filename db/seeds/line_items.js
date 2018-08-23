return knex('line_items').insert([
  {
    order_id: 1,
    menu_item_id: 1,
    quantity: 2
  },
  {
    order_id: 1,
    menu_item_id: 3,
    quantity: 3
  },
  {
    order_id: 1,
    menu_item_id: 4,
    quantity: 1
  },
  {
    order_id: 1,
    menu_item_id: 6,
    quantity: 1
  },
  {
    order_id: 2,
    menu_item_id: 7,
    quantity: 1
  },
  {
    order_id: 2,
    menu_item_id: 8,
    quantity: 2
  },
  {
    order_id: 2,
    menu_item_id: 9,
    quantity: 1
  },
])