const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Restaurant = require('../restaurant');
const restaurantsList = require('../../restaurants.json').results;
const User = require('../user');
const usersList = require('../../users.json').results;

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');

  // 第一個迴圈，產出使用者種子資料，再跑進入第二個迴圈產出餐廳種子資料，並賦予 userId
  for (let i = 0; i < usersList.length; i++) {
    const user = User(usersList[i]);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save().then().catch(err => {
          console.log(err);
        });
      });
    });

    // 第二個迴圈，依使用者 userId，以每次 3 筆餐廳資料的形式逐一歸屬各別使用者
    // num 代表餐廳 index，也用來與餐廳總數比較
    // 每產生一間餐廳，num 會自動加一，直到 num 與餐廳總數相同才中止
    for (let num = i * 3; num < (i + 1) * 3; num++) {
      Restaurant.create({
        ...restaurantsList[num],
        userId: user._id,
      });
      // 第一次迴圈： i 為 0 ； num 依序則為 0, 1, 2；range 0 < 3(此時 num 起始為 0)
      // 第二次迴圈： i 為 1 ； num 依序則為 3, 4, 5；range 2 < 6(此時 num 起始為 3)
      // 第三次迴圈： i 為 2 ； num 依序則為 6, 7, 8；range 5 < 9(此時 num 起始為 5)
      if (num === restaurantsList.length) return;
    }
  }

  console.log('User and Restaurant data get done!');
})