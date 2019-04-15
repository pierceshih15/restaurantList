const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// 1. 列出全部 restaurant 頁面
router.get('/', (req, res) => {
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

module.exports = router;