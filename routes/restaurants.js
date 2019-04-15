const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// 2. 新增一筆 restaurant 頁面
router.get('/new', (req, res) => {
  res.render('new');
});

// 3. 新增一筆 restaurant 動作
router.post('/', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    id: req.body.id,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  });
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect('/');
  });
});

// 4. 顯示一筆 restaurant 詳細資料的頁面
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('show', {
      restaurant: restaurant,
    });
  });
});

// 5. 修改一筆 restaurant 頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('edit', {
      restaurant: restaurant,
    });
  });
});

// 6. 修改一筆 restaurant 動作
router.put('/:id', (req, res) => {
  // Step 1：從資料庫取出資料
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);

    // Step 2：更新表單資料
    restaurant.name = req.body.name;
    restaurant.name_en = req.body.name_en;
    restaurant.id = req.body.id;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.rating = req.body.rating;
    restaurant.description = req.body.description;

    // Step 3：將更新後資料，存入資料庫，並轉向餐廳詳細頁面
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

// 7. 刪除一筆 restaurant 動作
router.delete(':id/delete', (req, res) => {
  // Step 1：從資料庫取出資料
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);

    // Step 2：將資料庫資料移除，並轉向首頁
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect('/');
    });
  });
});

module.exports = router;