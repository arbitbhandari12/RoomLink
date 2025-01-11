const mongoose = require('mongoose');

const shiftingRequestRejected = new mongoose({
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
    type: date,
    required: true
  },
  listofitems: {
    type: [String],
    required: true
  },
  helper: {
    type: String,
    required: true
  }
});

const rejectshiftRoom = mongoose.model('shiftingRequest', shiftingRequestRejected);
module.exports = rejectshiftRoom;