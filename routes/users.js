const express = require('express');
const router = express.Router();

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login');
});

// 登入動作（檢查）
router.post('/login', (req, res) => {
  res.send('login');
});

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register');
});

// 註冊動作(檢查)
router.post('/register', (req, res) => {
  res.send('register');
});

// 登出動作
router.get('/logout', (req, res) => {
  res.send('logout');
});

module.exports = router;