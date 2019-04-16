const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// 2. 新增一筆 restaurant 頁面
router.get('/new', (req, res) => {
  res.render('new');
});

// 3. 新增一筆 restaurant 動作
router.post('/', (req, res) => {

  // 將使用者送出的 req.body 作為參數傳入 Restaurant 物件使用，即可賦予資料
  const restaurant = Restaurant(req.body);

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
      restaurant
    });
  });
});

// 5. 修改一筆 restaurant 頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('edit', {
      restaurant
    });
  });
});

// 6. 修改一筆 restaurant 動作
router.put('/:id', (req, res) => {
  // Step 1：從資料庫取出資料
  Restaurant.findById(req.params.id, (err, restaurant) => {
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
router.delete('/:id/delete', (req, res) => {
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