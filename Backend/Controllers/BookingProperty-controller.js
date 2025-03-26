const Booking = require('../models/Booking-model');
const propertyList = require('../models/propertyList-model');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      to: to,
      subject: subject,
      text: text
    });
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
    if (error.response) {
      console.error('Error response:', error.response);
    }
  }
};


// Update room status to "Rented" and notify users
const roomStatuss = async (req, res) => {
  try {
    const room = await propertyList.findByIdAndUpdate(
      req.params.id,
      { roomStatus: 'Rented' },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Find all bookings for this room with dates after the current date
    const bookings = await Booking.find({
      room: req.params.id,
      date: { $gt: new Date() }
    }).populate('room');

    // Notify users with future bookings
    bookings.map(async (booking) => {
      const message = `Dear ${
        booking.name
      }, the room you booked on ${booking.date.toDateString()} has been rented by another user.`;
      await sendEmail(booking.email, 'Room Rented', message);
    });

    res
      .status(200)
      .json({ message: `Room status updated and notifications sent.` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Book a room
const booking = async (req, res) => {
  const room = req.params.id;
  const owner = await propertyList.findById(room);
  const response = owner.userId;
  const user = req.user;
  console.log(user);

  const { name, email, phone, date } = req.body;

  if (!user) {
    return res.status(401).json({ error: 'Please login first' });
  }

  try {
    // Check if a booking already exists for this room and date
    const existingBooking = await Booking.findOne({ room: room, date: date });

    if (existingBooking) {
      return res.status(400).json({
        msg: 'This date is already booked. Please select another date.'
      });
    }

    const userBooking = await Booking.findOne({ room: room, userId: user._id });

    if (userBooking) {
      return res.status(400).json({
        msg: 'You have already booked this room. You can only book it once.'
      });
    }

    // If no existing booking, create a new booking
    const newBooking = await Booking.create({
      name,
      email,
      phone,
      date,
      owner: response,
      room,
      userId: user._id
    });

    res.status(201).json({ msg: 'Booked Successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};
const bookingList = async (req, res) => {
  try {
    const user = req.user;
    const ownerBooking = await Booking.find({ userId: user._id });
    const rooms = ownerBooking.map((booking) => booking.room);
    const details = await propertyList.find({ _id: { $in: rooms } });
    res.status(200).json({ ownerBooking, details });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

const landloardBooking = async (req, res) => {
  try {
    const user = req.user;
    console.log('Current user ID: ', req.user._id);

    const ownerBooking = await Booking.find({ owner: user._id });
    const rooms = ownerBooking.map((booking) => booking.room);

    console.log(rooms);

    const details = await propertyList.find({ _id: { $in: rooms } });
    console.log(details);

    res.status(200).json({ ownerBooking, details });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Export both functions
module.exports = { booking, roomStatuss, bookingList, landloardBooking };
