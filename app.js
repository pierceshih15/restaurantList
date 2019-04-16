const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Router Variables
const HomeRouter = require('./routes/home');
const RestaurantsRouter = require('./routes/restaurants');
const SearchRouter = require('./routes/search');
const SortRouter = require('./routes/sort');

// Mongoose 
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
app.use(methodOverride('_method'));

// 首頁路由
app.use('/', HomeRouter);
// restaurants 路由
app.use('/restaurants', RestaurantsRouter);
// search 路由
app.use('/search', SearchRouter);
// sort 路由
app.use('/sort', SortRouter);

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})