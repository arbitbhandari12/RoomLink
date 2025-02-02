const mongoose = require('mongoose');

const bookinglist = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
<<<<<<< HEAD
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
=======
  endDate: {
>>>>>>> parent of 3c737c2 (Some Changes on booking and property models)
    type: Date,
    required: true
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'ApproveList' },
});

const Booking = mongoose.model('BookingList', bookinglist);
module.exports = Booking