const mongoose = require('mongoose');

const rejectList = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  kitchen: {
    type: String,
    required: true
  },
  parking: {
    type: String,
    required: true
  },
  balcony: {
    type: String,
    required: true
  },
  furnishing: {
    type: String,
    required: true
  },
  water: {
    type: String,
    required: true
  },
  school: {
    type: String
  },
  healthcare: {
    type: String
  },
  park: {
    type: String
  },
  transport: {
    type: String
  },
  temple: {
    type: String
  },
  bank: {
    type: String
  },
  status: {
    type: String,
    default: 'Rejected'
  }
});

const reject = mongoose.model('RejectList', rejectList);
module.exports = reject;
