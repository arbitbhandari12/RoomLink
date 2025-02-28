const mongoose = require('mongoose');

const propertyList = new mongoose.Schema({
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
    type: String,
    required: true
  },
  healthcare: {
    type: String,
    required: true
  },
  park: {
    type: String,
    required: true
  },
  transport: {
    type: String,
    required: true
  },
  temple: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  roomStatus: {
    type: String,
    enum: ['Available', 'Rented'],
    default: 'Available'
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Pending'
  },
  userId: {
    type: String,
    required: true
  }
});

const List = mongoose.model('PropertyList', propertyList);
module.exports = List;
