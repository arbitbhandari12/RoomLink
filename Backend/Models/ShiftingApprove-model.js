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
    default: 'Approved'
  }
});

const ShiftRoomApprove = mongoose.model('approveShiftingRequest', shiftingRequestSchema);
module.exports = ShiftRoomApprove;
