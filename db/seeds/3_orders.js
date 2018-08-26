exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({
          id: 1,
          user_id: 1,
          time: '2018-08-22T12:12:38.318Z',
          order_status: 4,
          pickup_time: '2018-08-22T12:22:38.318Z'
        }),
        knex('orders').insert({
          id: 2,
          user_id: 2,
          time: '2018-08-23T11:27:54.318Z',
          order_status: 4,
          pickup_time: '2018-08-23T11:37:54.318Z'
        }),
        knex('orders').insert({
          id: 3,
          user_id: 3,
          time: '2018-08-23T12:46:12.318Z',
          order_status: 4,
          pickup_time: '2018-08-23T12:56:12.318Z'
        }),
        knex('orders').insert({
          id: 4,
          user_id: 2,
          time: '2018-08-24T11:18:33.318Z',
          order_status: 3,
          pickup_time: '2018-08-24T11:18:43.318Z'
        }),
        knex('orders').insert({
          id: 5,
          user_id: 4,
          time: '2018-08-25T17:23:07.318Z',
          order_status: 2,
          pickup_time: '2018-08-25T17:33:07.318Z'
        }),
        knex('orders').insert({
          id: 6,
          user_id: 4,
          time: '2018-08-25T18:11:23.318Z',
          order_status: 1,
          pickup_time: null
        })
      ]);
    });
};
