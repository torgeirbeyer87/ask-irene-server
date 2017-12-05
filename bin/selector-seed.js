// Iteration #1

const Selector = require('../models/selector').Selector;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ask-irene');

const selectors = [{
  disctrict: ['Barceloneta',
    'Beyond Barcelona',
    'Born',
    'Eixample Dreta',
    'Eixample Esquerra',
    'Gòtic',
    'Gràcia',
    'Les Corts',
    'Poble Sec',
    'Poblenou',
    'Putxet & El Farró',
    'Raval',
    'Sant Antoni',
    'Sant Gervasi & La Bonanova',
    'Sants',
    'Sarrià'],
  situation: [
    'Business Dining',
    'Date',
    'Family',
    'Friends',
    'Read & Chill',
    'Take Away',
    'Working Spot'
  ],
  price: [
    'Budget-friendly',
    'Affordable',
    'Worth it',
    'Treat Yo Self'
  ],
  categories: [
    'Cocktails',
    'American',
    'Asian Fusion',
    'Avant-garde Cuisine',
    'Bar',
    'Brasa',
    'Breakfast & brunch',
    'Burger & sandwich',
    'Café',
    'Cake & pastry',
    'Caribbean',
    'Chinese',
    'Craft beer',
    'French',
    'Healthy',
    'Ice cream',
    'Italian',
    'Japanese',
    'Korean',
    'Mexican',
    'Peruvian',
    'Pizza',
    'Ramen',
    'Seafood',
    'South American',
    'Speciality Coffee',
    'Sushi',
    'Tapas',
    'Thai',
    'Vermut',
    'Vietnamese',
    'Wine'],
  tags: [
    'Beautiful Views',
    'Bike Parking',
    'Cool Bathroom',
    'Dog-friendly',
    'Good for groups',
    'Insta-worthy',
    'Interior Porn',
    'Late Night Eats',
    'Light Bites',
    'Lunch Menu',
    'Outdoor',
    'Paleo-friendly',
    'Rooftop',
    'Vegan Options',
    'WiFi'
  ],
  vibe: [
    'Feels like home',
    'Foodie Mecca',
    'Hipster Alert',
    'Locals Fav',
    'Special Occasion',
    'Trending Now'
  ]
}
];

Selector.create(selectors, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((selector) => {
    console.log(selector.title);
  });
  mongoose.connection.close();
});
