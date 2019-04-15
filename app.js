const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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
app.use('/', require('./routes/home'));
// restaurants 路由
app.use('/restaurants', require('./routes/restaurants'));
// search 路由
app.use('/search', require('./routes/search'));
// sort 路由
app.use('/sort', require('./routes/sort'));

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})