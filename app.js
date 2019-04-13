const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const restaurantsList = require('./restaurants.json');

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

// Setting homePage route
app.get('/', (req, res) => {
  res.render('index', {
    restaurants: restaurantsList.results
  })
});

app.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword;
  // 處理 1.餐廳英文名稱 2.餐廳中文名稱 3.餐廳分類 的搜尋條件
  const filterRestaurants = restaurantsList.results.filter(item => {
    return item.name_en.toLowerCase().includes(searchKeyword.toLowerCase()) || item.name.toLowerCase().includes(searchKeyword.toLowerCase()) || item.category.toLowerCase().includes(searchKeyword.toLowerCase())
  })

  res.render('index', {
    keyword: searchKeyword,
    restaurants: filterRestaurants,
  })
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.filter(item => item.id == req.params.restaurant_id);

  res.render('show', {
    restaurant: restaurant[0],
  })
});

// 建立頁面路由 
// 1. 列出全部 restaurant 頁面
app.get('/restaurants', (req, res) => {
  res.send('列出所有餐廳');
});

// 2. 新增一筆 restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增一間餐廳的頁面');
});

// 3. 新增一筆 restaurant 動作
app.post('/restaurants', (req, res) => {
  res.send('新增一間餐廳');
});

// 4. 顯示一筆 restaurant 詳細資料的頁面
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示一間 餐廳 詳細資料的頁面');
});

// 5. 修改一筆 restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('編輯一間餐廳頁面');
});

// 6. 修改一筆 restaurant 動作
app.post('/restaurants/:id', (req, res) => {
  res.send('編輯一間餐廳');
});

// 7. 刪除一筆 restaurant 動作
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除一間餐廳');
});

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})