const shifting = require('../models/ShiftingRequest-model');

const shiftingRequest = async (req, res) => {
  try {
    const approve = await shifting.find({});
    res.status(201).json({ message: 'Admin', approve });
    console.log(approve);
  } catch (error) {
    console.log(error);
  }
};

module.exports = shiftingRequest;
