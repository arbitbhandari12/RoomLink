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
  date: {
    type: Date,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyList' }
});

const Booking = mongoose.model('BookingList', bookinglist);
module.exports = Booking;
