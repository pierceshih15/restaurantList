const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const restaurantsList = require('../../restaurants.json');

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');

  const data = restaurantsList.results;
  for (var i = 0; i < data.length; i++) {
    Restaurant.create({
      id: data[i].id,
      name: data[i].name,
      name_en: data[i].name_en,
      category: data[i].category,
      image: data[i].image,
      location: data[i].location,
      phone: data[i].phone,
      google_map: data[i].google_map,
      rating: data[i].rating,
      description: data[i].description,
    });
  }

  console.log('done');
});