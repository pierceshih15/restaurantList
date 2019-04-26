const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const {
  authenticated
} = require('../config/auth');

// 1. 列出全部 restaurant 頁面
router.get('/', authenticated, (req, res) => {
  Restaurant.find({
      userId: req.user._id,
    })
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