const shiftRequest = require('../models/ShiftingRequest-model');

const shiftRoom = async (req, res) => {
  try {
    const newRequest = await shiftRequest.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      pickup: req.body.pickup,
      dropoff: req.body.dropoff,
      shiftingdate: req.body.shiftingdate,
      listofitems: req.body.listofitems,
      helper: req.body.helper
    });
    res.status(201).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit request.' });
  }
};

module.exports = shiftRoom;
