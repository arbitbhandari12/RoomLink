const mongoose = require('mongoose');

const bookinglist = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: true
  }
});

const Booking = mongoose.model('BookingList', bookinglist);
module.exports = Booking;
