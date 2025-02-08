const shifting = require('../models/ShiftingRequest-model');

const shiftingRequest = async (req, res) => {
  try {
    const approve = await shifting.find({});
    res.status(201).json({ approve });
    console.log(approve);
  } catch (error) {
    console.log(error);
  }
};

const details = async (req, res) => {
  try {
    const id = req.params.id;
    const shiftingDetails = await shifting.findById(id);
    res.status(200).json(shiftingDetails);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { shiftingRequest, details };
