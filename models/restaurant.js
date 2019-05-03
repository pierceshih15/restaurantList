const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);