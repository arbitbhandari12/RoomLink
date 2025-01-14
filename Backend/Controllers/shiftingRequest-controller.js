const shiftRequest = require('../models/ShifttingRoom-model');

const shiftRoom = async (req, res) => {
  try {
    const newRequest = await shiftRequest.create({
      name: req.body,
      phone: req.body,
      email: req.body,
      pickup: req.body,
      dropoff: req.body,
      shiftingdate: req.body,
      listofitems: req.body,
      helper: req.body
    });
    res.status(201).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submitted request.' });
  }
};

module.exports = shiftRoom;