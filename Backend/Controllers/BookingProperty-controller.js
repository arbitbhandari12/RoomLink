const Booking = require('../models/Booking-model');
const propertyList = require('../models/propertyList-model');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

const accountSid = 'ACcae7aeb6cf82f3df8b61bf9d0873062a';
const authToken = 'f5dcf4c9d8c734cb22826216d006e6d7';
const twilioClient = twilio(accountSid, authToken);

// Send SMS function
const sendSMS = async (phone, message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: '+18483151895',
      to: phone,
    });
    console.log(`SMS sent: ${response.sid}`);
  } catch (error) {
    console.error(`Error sending SMS:`, error.message);
  }
};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arbitbhandari17@gmail.com',
    pass: 'qbkp vpvk cwuz glcj', 
  },
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      to: to,
      subject: subject,
      text: text,
    });
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email:`, error);
  }
};

// Update room status to "Rented" and notify users
const roomStatuss = async (req, res) => {
  try {
    const room = await propertyList.findByIdAndUpdate(
      req.params.id,
      { status: 'Rented' },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Find all bookings for this room with dates after the current date
    const bookings = await Booking.find({
      room: req.params.id,
      date: { $gt: new Date() },
    }).populate('room');

    // Notify users with future bookings
    const notificationPromises = bookings.map(async (booking) => {
      const message = `Dear ${booking.name}, the room you booked on ${booking.date.toDateString()} has been rented by another user.`;

      // Send SMS
      await sendSMS(booking.phone, message);

      // Send Email
      await sendEmail(booking.email, 'Room Rented', message);
    });

    await Promise.all(notificationPromises); // Wait for all notifications

    res.status(200).json({ message: `Room status updated and notifications sent.` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Book a room
const booking = async (req, res) => {
  const room = req.params.id;
  try {
    const newBooking = await Booking.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      room: room, 
    });

    res.status(201).json({ msg: 'Booked Successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Export both functions
module.exports = { booking, roomStatuss };
