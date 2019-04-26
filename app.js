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
const UserRouter = require('./routes/users');

// Mongoose 
const mongoose = require('mongoose');

// 載入 express-session 與 passport
const session = require('express-session');
const passport = require('passport');

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

// Session and passport
app.use(session({
  secret: 'ioqeodond',
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Middleware
require('./config/passport')(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 首頁路由
app.use('/', HomeRouter);
// restaurants 路由
app.use('/restaurants', RestaurantsRouter);
// search 路由
app.use('/search', SearchRouter);
// sort 路由
app.use('/sort', SortRouter);
// user 路由
app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})