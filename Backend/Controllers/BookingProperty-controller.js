const Booking = require('../models/Booking-model');

const booking = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const isBooked = await Booking.findOne({
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    });
    if (isBooked) {
      return res
        .status(400)
        .json({ message: 'Selected dates are already booked.' });
    }
    await Booking.create({
      startDate,
      endDate
    });
    res.status(201).json({ msg: 'Booked Sucessfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error Please Try again later' });
  }
};

module.exports = booking;
