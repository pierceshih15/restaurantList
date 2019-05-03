const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const {
  authenticated
} = require('../config/auth');

// 1. 列出全部 restaurant 頁面，含搜尋與排序功能
router.get('/', authenticated, (req, res) => {
  // 宣告搜尋與篩選變數
  const searchKeyword = req.query.searchKeyword;
  const searchKeywordRegExp = new RegExp(req.query.searchKeyword, 'i');
  const sortField = req.query.sortField || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const sortObject = {};
  sortObject[sortField] = sortOrder;

  Restaurant.find({
      userId: req.user._id,
      $or: [{
        name: {
          $regex: searchKeywordRegExp
        }
      }, {
        category: {
          $regex: searchKeywordRegExp
        }
      }],
    })
    .sort(sortObject)
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants,
        searchKeyword,
        sortField,
        sortOrder
      })
    })
});

module.exports = router;