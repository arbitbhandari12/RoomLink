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
    console.log(`Sending SMS to: ${phone}`);
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
    console.log(`Sending email to: ${to}`);
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
  console.log(`Updating room status for room ID: ${req.params.id}`);
  try {
    const room = await propertyList.findByIdAndUpdate(
      req.params.id,
      { roomStatus: 'Rented' },
      { new: true }
    );

    if (!room) {
      console.log('Room not found');
      return res.status(404).json({ message: 'Room not found' });
    }

    console.log(`Room updated to "Rented" status`);

    // Find all bookings for this room with dates after the current date
    const bookings = await Booking.find({
      room: req.params.id,
      date: { $gt: new Date() },
    }).populate('room');

    console.log(`Found ${bookings.length} future bookings`);

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
    console.error(`Error updating room status: ${error.message}`);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Book a room
const booking = async (req, res) => {
  const room = req.params.id;
  const { name, email, phone, date } = req.body;

  console.log(`Attempting to book room ID: ${room} for date: ${date}`);
  
  try {
    // Check if a booking already exists for this room and date
    const existingBooking = await Booking.findOne({ room: room, date: date });

    if (existingBooking) {
      console.log('Booking already exists for this date');
      return res.status(400).json({ msg: 'This date is already booked. Please select another date.' });
    }

    console.log('No existing booking found. Creating new booking...');
    
    // If no existing booking, create a new booking
    const newBooking = await Booking.create({
      name,
      email,
      phone,
      date,
      room,
    });

    console.log('Booking created successfully');
    res.status(201).json({ msg: 'Booked Successfully', booking: newBooking });
  } catch (error) {
    console.error(`Error booking room: ${error.message}`);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

module.exports = { booking, roomStatuss };
