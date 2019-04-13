const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');
});

const Restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Setting static file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// 搜尋功能 Action
app.get('/search', (req, res) => {
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

// 建立頁面路由 
// 1. 列出全部 restaurant 頁面
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render('index', {
      restaurants: restaurants
    })
  })
});

// 2. 新增一筆 restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new');
});

// 3. 新增一筆 restaurant 動作
app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('show', {
      restaurant: restaurant,
    });
  });
});

// 5. 修改一筆 restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render('edit', {
      restaurant: restaurant,
    });
  });
});

// 6. 修改一筆 restaurant 動作
app.post('/restaurants/:id', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
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

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})