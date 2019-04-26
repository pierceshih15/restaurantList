const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const {
  authenticated
} = require('../config/auth');

// 搜尋 action
router.get('/', authenticated, (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);

    const searchKeyword = req.query.keyword;
    // 處理 1.餐廳英文名稱 2.餐廳中文名稱 3.餐廳分類 的搜尋條件
    const filterRestaurants = restaurants.filter(item => {
      return item.name_en.toLowerCase().includes(searchKeyword.toLowerCase()) || item.name.toLowerCase().includes(searchKeyword.toLowerCase()) || item.category.toLowerCase().includes(searchKeyword.toLowerCase())
    })

    return res.render('index', {
      keyword: searchKeyword,
      restaurants: filterRestaurants,
    })
  })
});

module.exports = router;