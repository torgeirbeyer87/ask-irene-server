// Iteration #1

const Spot = require('../models/spot').Spot;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ask-irene');

const spots = [
  {
    'name': 'Servicio Continuo',
    'district': 'Eixample Dreta',
    'category': ['Cocktails', 'American', 'Bar'],
    'situation': 'Date',
    'price': 'Affordable',
    'vibe': 'Hipster Alert',
    'tags': ['Late Night Eats', 'Insta-worthy', 'Cool Bathroom', 'Dog-friendly', 'Good for groups', 'Interior Porn', 'Light Bites', 'Outdoor', 'Paleo-friendly', 'Vegan Options'],
    'images': ['Bb38853Fz0_', 'BcHs2AXFXsN', 'BcLKgNPlIqb'],
    'description': 'Part-restaurant, part-cocktail bar. Servicio Continuo is the place to go if you want to run into local celebrities or everything else is closed.',
    'links': ['http://serviciocontinuo.com', 'https://www.facebook.com/CocktailBarDiagonal', 'https://goo.gl/maps/nsnxhbYgmbR2', 'https://www.instagram.com/serviciocontinuo/'],
    'location': [41.397852, 2.164561]
  },
  {
    'name': 'Chen Ji',
    'district': 'Barceloneta',
    'category': ['Cocktails', 'Brasa', 'Breakfast & Brunch'],
    'situation': 'Date',
    'price': 'Budget-friendly',
    'vibe': 'Hipster Alert',
    'tags': ['Late Night Eats', 'Insta-worthy', 'Cool Bathroom', 'Dog-friendly', 'Good for groups', 'Interior Porn', 'Light Bites', 'Outdoor', 'Paleo-friendly', 'Vegan Options'],
    'images': ['Bb38853Fz0_', 'BcHs2AXFXsN', 'BcLKgNPlIqb'],
    'description': 'Part-restaurant, part-cocktail bar. Servicio Continuo is the place to go if you want to run into local celebrities or everything else is closed.',
    'links': ['http://serviciocontinuo.com', 'https://www.facebook.com/CocktailBarDiagonal', 'https://goo.gl/maps/eZKeNh7hrUR2', 'https://www.instagram.com/serviciocontinuo/'],
    'location': [null, null]
  },
  {
    'name': 'Koku Kitchen',
    'district': 'Poblenou',
    'category': ['Cocktails', 'Chinese', 'Healthy'],
    'situation': 'Date',
    'price': 'Worth it',
    'vibe': 'Hipster Alert',
    'tags': ['Late Night Eats', 'Insta-worthy', 'Cool Bathroom', 'Dog-friendly', 'Good for groups', 'Interior Porn', 'Light Bites', 'Outdoor', 'Paleo-friendly', 'Vegan Options'],
    'images': ['Bb38853Fz0_', 'BcHs2AXFXsN', 'BcLKgNPlIqb'],
    'description': 'Part-restaurant, part-cocktail bar. Servicio Continuo is the place to go if you want to run into local celebrities or everything else is closed.',
    'links': ['http://serviciocontinuo.com', 'https://www.facebook.com/CocktailBarDiagonal', 'https://goo.gl/maps/5dpP9udNpXC2', 'https://www.instagram.com/serviciocontinuo/'],
    'location': [null, null]
  }];

Spot.create(spots, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((spot) => {
    console.log(spot.title);
  });
  mongoose.connection.close();
});
