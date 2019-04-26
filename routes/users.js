const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login');
});

// 登入動作（檢查）
// next 等於 passport middleware 的 done 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next);
});

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register');
});

// 註冊動作(檢查)
router.post('/register', (req, res) => {
  // Step 1：處理從註冊頁面傳送來的請求
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  // Step 2：檢查使用者的 email 是否已註冊
  User.findOne({
    email: email
  }).then(user => {
    // Step 2-1：若已註冊過，則跳轉至註冊頁面，亦將表單資料回傳
    if (user) {
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      // Step 2-2：若未註冊過，則新增使用者資料
      // Step 2-2-1：引用 User Model，並將表單資料賦予 newUser 物件
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw error;
          newUser.password = hash;
          // Step 2-2-2：透過 save 語法，將 newUser 物件存入資料庫
          newUser.save().then(user => {
            res.redirect('/');
          }).catch(err => {
            console.log(err);
          })
        })
      })
    }
  })
});

// 登出動作
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;