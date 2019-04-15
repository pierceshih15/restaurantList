const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');


// 餐廳評分排序
router.get('/rating', (req, res) => {
  Restaurant.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants: restaurants
      })
    })
});

// 餐廳類別排序
router.get('/category', (req, res) => {
  Restaurant.find({})
    .sort({
      category: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants: restaurants
      })
    })
});

// A > Z 升冪排序
router.get('/asc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants: restaurants
      })
    })
});

// Z > A 降冪排序
router.get('/desc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants: restaurants
      })
    })
});



module.exports = router;