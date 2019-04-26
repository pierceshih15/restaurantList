const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const {
  authenticated
} = require('../config/auth');

// 餐廳評分排序
router.get('/rating', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});

// 餐廳類別排序
router.get('/category', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      category: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});

// A > Z 升冪排序
router.get('/asc', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});

// Z > A 降冪排序
router.get('/desc', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});



module.exports = router;