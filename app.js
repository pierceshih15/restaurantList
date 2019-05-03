const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Restaurant = require('./models/restaurant')

// Router Variables
const HomeRouter = require('./routes/home');
const RestaurantsRouter = require('./routes/restaurants');
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auths');

// Mongoose 
const mongoose = require('mongoose');

// 載入 express-session 與 passport
const session = require('express-session');
const passport = require('passport');

const flash = require('connect-flash');

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');
});


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
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

// Passport Middleware
require('./config/passport')(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  next();
});

// 首頁路由
app.use('/', HomeRouter);
// restaurants 路由
app.use('/restaurants', RestaurantsRouter);
// user 路由
app.use('/users', UserRouter);
// auth 路由
app.use('/auth', AuthRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})