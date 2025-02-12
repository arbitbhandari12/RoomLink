const mongoose = require('mongoose');

const shiftingRequest = new mongoose.Schema({
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
  pickup: {
    type: String,
    required: true
  },
  dropoff: {
    type: String,
    required: true
  },
  shiftingdate: {
    type: Date,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  helper: {
    type: String,
    required: true
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

const shiftRoom = mongoose.model('shiftingRequest', shiftingRequest);
module.exports = shiftRoom;
