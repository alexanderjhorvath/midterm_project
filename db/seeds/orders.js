return knex('orders').insert([
  {
    user_id: 1,
    time: '2018-08-23T21:49:07.318Z',
    order_status: 'Completed'
  },
  {
    user_id: 2,
    time: '2018-08-23T21:49:07.318Z',
    order_status: 'Completed'
  },
  {
    user_id: 3,
    time: '2018-08-23T21:49:07.318Z',
    order_status: 'Completed'
  },
  {
    user_id: 4,
    time: '2018-08-23T21:49:07.318Z',
    order_status: 'Completed'
  },
])