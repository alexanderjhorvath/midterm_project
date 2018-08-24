exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({
          id: 1,
          user_id: 1,
          time: '2018-08-23T21:29:07.318Z',
          order_status: 'Completed'
        }),
        knex('orders').insert({
          id: 2,
          user_id: 2,
          time: '2018-08-23T21:39:07.318Z',
          order_status: 'Completed'
        }),
        knex('orders').insert({
          id: 3,
          user_id: 3,
          time: '2018-08-23T21:59:07.318Z',
          order_status: 'Completed'
        }),
        knex('orders').insert({
          id: 4,
          user_id: 2,
          time: '2018-08-23T21:49:07.318Z',
          order_status: 'Completed'
        })
      ]);
    });
};
