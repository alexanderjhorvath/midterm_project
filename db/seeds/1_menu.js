
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
          image_url: 'https://c2.staticflickr.com/8/7572/16203586352_e4f7746bbb_q.jpg',
          inventory: 100,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 2,
          name: 'Tomato Fennel Soup',
          cost: 7,
          price: 14.00,
          description: 'Fire-roasted tomatoes and fennel with rich cream, squash, onions, garlic, slow cooked with in-house broth.',
          image_url: 'https://c2.staticflickr.com/2/1787/42899885582_d5d3df8d66_q.jpg',
          inventory: 80,
          category: 'soup'
        }),
        knex('menu_items').insert({
          id: 3,
          name: 'Mediterranean Spinach Salad',
          cost: 7,
          price: 14.00,
          description: 'Spinach, artichokes, red bell pepper, grape tomatoes, red onion, feta cheese, kalamata olives, greek vinaigrette',
          image_url: 'https://c1.staticflickr.com/5/4116/4773024987_4af43ecdcd_q.jpg',
          inventory: 45,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 4,
          name: 'Wild Crunch Salad',
          cost: 7,
          price: 14.00,
          description: 'Mixed field greens, pepitas, sliced red cabbage, red bell pepper, sliced almonds, sweet thai chili vinaigrette. Crispy wonton skins, peanut sauce',
          image_url: 'https://c1.staticflickr.com/5/4031/4625232911_cae39584cc_q.jpg',
          inventory: 55,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 5,
          name: 'Warm Chicken Salad',
          cost: 7,
          price: 14.00,
          description: 'Blackened fresh chicken breast on a bed of crisp field greens and fresh spinach, tarragon vinaigrette dressing, on a bed of polenta.',
          image_url: 'https://c1.staticflickr.com/5/4533/26673286859_5e3a493cf2_q.jpg',
          inventory: 80,
          category: 'salad'
        }),
        knex('menu_items').insert({
          id: 6,
          name: 'Pulled Pork Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Our hickory-smoked pulled pork, topped with Honey BBQ sauce, tomato, in-house pickled red onions and crisp veggie slaw.',
          image_url: 'https://c1.staticflickr.com/5/4348/36079300143_960382f46a_q.jpg',
          inventory: 75,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 7,
          name: 'Chicken Sandwich',
          cost: 8,
          price: 16.00,
          description: 'Free-run chicken with diced celery, seedless grapes, almonds and our special dressing served with lettuce and vine-ripened tomatoes on Country Rustic Bread. ',
          image_url: 'https://c2.staticflickr.com/4/3232/2778381413_842555f68e_q.jpg',
          inventory: 100,
          category: 'sandwich'
        }),
        knex('menu_items').insert({
          id: 8,
          name: "Egg n' Avo Toast",
          cost: 8,
          price: 16.00,
          description: 'Two soft-boiled eggs, avocado, pine nuts, dark german rye, drizzled with olive oil',
          image_url: 'https://c2.staticflickr.com/2/1830/28009948117_bd580f1854_q.jpg',
          inventory: 100,
          category: 'sandwich'
        })
      ]);
    });
};
