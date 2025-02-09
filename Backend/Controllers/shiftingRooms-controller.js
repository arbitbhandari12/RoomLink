const shiftRequest = require('../models/ShiftingRequest-model');
const approve = require('../models/ShiftingApprove-model');
const Reject = require('../models/ShiftingRejected-Model');

const shiftRoom = async (req, res) => {
  try {
    await shiftRequest.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      pickup: req.body.pickup,
      dropoff: req.body.dropoff,
      shiftingdate: req.body.shiftingdate,
      categories: req.body.categories,
      helper: req.body.helper
    });
    res.status(201).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit request.' });
  }
};

const shiftApprove = async (req, res) => {
  try {
    const id = req.params.id;
    const shift = await shiftRequest.findById(id);
    if (!shift) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
    await approve.create({
      name: shift.name,
      phone: shift.phone,
      email: shift.email,
      pickup: shift.pickup,
      dropoff: shift.dropoff,
      shiftingdate: shift.shiftingdate,
      categories: shift.categories,
      helper: shift.helper
    });
    console.log(shift);
  } catch (error) {
    console.log(error);
  }
};


const shiftReject = async (req, res) => {
  try {
    const id = req.params.id;
    const shift = await shiftRequest.findById(id);
    if (!shift) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
    await approve.create({
      name: shift.name,
      phone: shift.phone,
      email: shift.email,
      pickup: shift.pickup,
      dropoff: shift.dropoff,
      shiftingdate: shift.shiftingdate,
      categories: shift.categories,
      helper: shift.helper
    });
    console.log(shift);
  } catch (error) {
    console.log(error);
  }
};


module.exports = { shiftRoom, shiftApprove };
