const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new User({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: Data,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);