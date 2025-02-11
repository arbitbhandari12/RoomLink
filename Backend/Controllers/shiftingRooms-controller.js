const shiftList = require('../models/ShiftingRequest-model');

const shiftRoom = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Please login first' });
    }

    await shiftList.create({
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
    const shift = await shiftList.findByIdAndUpdate(
      id,
      { status: 'Approved' },
      { new: true }
    );
    if (!shift) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

const shiftReject = async (req, res) => {
  try {
    const id = req.params.id;
    const shift = await shiftList.findByIdAndUpdate(
      id,
      { status: 'Rejected' },
      {
        new: true
      }
    );
    if (!shift) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

const shiftingRequest = async (req, res) => {
  try {
    const approve = await shiftList.find({});
    res.status(201).json({ approve });
    console.log(approve);
  } catch (error) {
    console.log(error);
  }
};

const details = async (req, res) => {
  try {
    const id = req.params.id;
    const shiftingDetails = await shiftList.findById(id);
    res.status(200).json(shiftingDetails);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  shiftRoom,
  shiftApprove,
  shiftReject,
  shiftingRequest,
  details
};
