
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu_items').insert({
          id: 1,
          name: 'Butternut Squash Soup',
          cost: 7,
          price: 14.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=350',
          inventory: 100,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 2,
          name: 'Tomato Fennel Soup',
          cost: 7,
          price: 14.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=350',
          inventory: 100,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 3,
          name: 'Chicken Caesar Salad',
          cost: 7,
          price: 14.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=350',
          inventory: 100,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 4,
          name: 'Salmon Salad',
          cost: 7,
          price: 14.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=350',
          inventory: 100,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 5,
          name: 'Kale Caesar Salad',
          cost: 7,
          price: 14.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=350',
          inventory: 100,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 6,
          name: 'Pulled Pork Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/5506/bread-food-salad-sandwich.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 7,
          name: 'Chicken Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/133578/pexels-photo-133578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 8,
          name: 'Veggie Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisi ac metus finibus, sollicitudin ullamcorper ante congue',
          image_url: 'https://images.pexels.com/photos/879201/pexels-photo-879201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'sandwich'
        })
      ]);
    });
};
