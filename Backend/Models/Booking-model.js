const mongoose = require('mongoose');

const bookinglist = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: true
  }
});

const Booking = mongoose.model('BookingList', bookinglist);
module.exports = Booking