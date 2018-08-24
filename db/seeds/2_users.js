exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          name: 'Alice',
          email: 'alice@alice.alice',
          phone_number: 1231231234
        }),
        knex('users').insert({
          id: 2,
          name: 'Bob',
          email: 'bob@bob.bob',
          phone_number: 2342342345
        }),
        knex('users').insert({
          id: 3,
          name: 'Charlie',
          email: 'charlie@charlie.charlie',
          phone_number: 3453453456
        })
      ]);
    });
};
