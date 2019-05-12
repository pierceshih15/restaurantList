const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const {
  authenticated
} = require('../config/auth');

// 2. 新增一筆 restaurant 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new');
});

// 3. 新增一筆 restaurant 動作
router.post('/', authenticated, (req, res) => {
  // 將使用者送出的 req.body 作為參數傳入 Restaurant 物件使用，即可賦予資料
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id,
  });

  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect('/');
  });
});

// 4. 顯示一筆 restaurant 詳細資料的頁面
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({
    userId: req.user._id,
    _id: req.params.id,
  }, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('show', {
      restaurant
    });
  });
});

// 5. 修改一筆 restaurant 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({
    userId: req.user._id,
    _id: req.params.id,
  }, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('edit', {
      restaurant
    });
  });
});

// 6. 修改一筆 restaurant 動作
router.put('/:id', authenticated, (req, res) => {
  // Step 1：從資料庫取出資料
  Restaurant.findOne({
    userId: req.user._id,
    _id: req.params.id,
  }, (err, restaurant) => {
    if (err) return console.error(err);

    // Step 2：更新表單資料，Object.assign(target array, ...sources array)
    Object.assign(restaurant, req.body);

    // Step 3：將更新後資料，存入資料庫，並轉向餐廳詳細頁面
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

// 7. 刪除一筆 restaurant 動作
router.delete('/:id/delete', authenticated, (req, res) => {
  // Step 1：從資料庫取出資料
  Restaurant.findOne({
    userId: req.user._id,
    _id: req.params.id,
  }, (err, restaurant) => {
    if (err) return console.error(err);

    // Step 2：將資料庫資料移除，並轉向首頁
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect('/');
    });
  });
});

module.exports = router;