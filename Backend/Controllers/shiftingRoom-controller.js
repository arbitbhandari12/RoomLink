const shiftRoom = require('../models/ShiftingRequest-model'); // Import model

const shiftingRequest = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      pickup,
      dropoff,
      shiftingdate,
      listofitems,
      helper
    } = req.body;

    const request = await shiftRoom.create({
      name,
      phone,
      email,
      pickup,
      dropoff,
      shiftingdate,
      listofitems,
      helper
    });

    res
      .status(201)
      .json({ message: 'Shifting request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit shifting request.' });
  }
};

module.exports = shiftingRequest;
