const mongoose = require('mongoose');

const shiftingRequestSchema = new mongoose.Schema({
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
  listOfitems: { 
    type: [String],
    required: true
  },
  helper: {
    type: String,
    required: true
  }
});

const ShiftRoomApprove = mongoose.model('approveShiftingRequest', shiftingRequestSchema);
module.exports = ShiftRoomApprove;
