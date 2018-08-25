
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
          description: 'Puréed, roasted squash becomes naturally creamy without adding dairy to this satisfying winter comfort food.',
          image_url: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 2,
          name: 'Tomato Fennel Soup',
          cost: 7,
          price: 14.00,
          description: 'Fire-roasted tomatoes and fennel with rich cream, squash, onions, garlic, slow cooked with in-house broth.',
          image_url: 'https://images.pexels.com/photos/262947/pexels-photo-262947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 80,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 3,
          name: 'Mediterranean Spinach Salad',
          cost: 7,
          price: 14.00,
          description: 'Spinach, artichokes, red bell pepper, grape tomatoes, red onion, feta cheese, kalamata olives, greek vinaigrette',
          image_url: 'https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 45,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 4,
          name: 'Wild Crunch Salad',
          cost: 7,
          price: 14.00,
          description: 'Mixed field greens, pepitas, sliced red cabbage, red bell pepper, sliced almonds, sweet thai chili vinaigrette. Crispy wonton skins, peanut sauce',
          image_url: 'https://images.pexels.com/photos/628777/pexels-photo-628777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 55,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 5,
          name: 'Warm Chicken Salad',
          cost: 7,
          price: 14.00,
          description: 'Blackened fresh chicken breast on a bed of crisp field greens and fresh spinach, tarragon vinaigrette dressing, on a bed of polenta.',
          image_url: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 80,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 6,
          name: 'Pulled Pork Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Our hickory-smoked pulled pork, topped with Honey BBQ sauce, in-house pickled red onions and crisp veggie slaw.',
          image_url: 'https://images.pexels.com/photos/5510/bread-food-plate-rucola.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 75,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 7,
          name: 'Chicken Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Free-run chicken with diced celery, seedless grapes, almonds and our special dressing served with lettuce and vine-ripened tomatoes on Country Rustic Bread. ',
          image_url: 'https://images.pexels.com/photos/5506/bread-food-salad-sandwich.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 8,
          name: "Egg n' Avo Toast",
          cost: 8,
          price: 16.00,
          description: 'Two soft-boiled eggs, avocado, pine nuts, dark german rye, drizzled with olive oil',
          image_url: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          inventory: 100,
          category: 'sandwich'
        })
      ]);
    });
};
