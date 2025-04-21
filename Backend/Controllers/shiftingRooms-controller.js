const shiftList = require('../models/ShiftingRequest-model');
const nodemailer = require('nodemailer');

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
    console.error(`Error sending email:`, error);
  }
};

const shiftRoom = async (req, res) => {
  try {
    const user = req.user;
    const id = req.user._id;
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
      helper: req.body.helper,
      userId: id
    });
    res.status(201).json({ message: 'Request submitted successfully!' });
  } catch (error) {
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

    res.status(200).json({ message: 'Shifting request approved', shift });

    const message = `Dear ${shift.name},
We are pleased to inform you that your room shifting request has been approved. Below are the details of your shift:

- **Shifting Date**: ${new Date(shift.shiftingdate).toLocaleString()}
- **Pick-Up Location**: ${shift.pickUpLocation}
- **Drop-Off Location**: ${shift.dropOffLocation}
    
Our team will be arriving at your pick-up location on the specified date to assist you with the shift. If you have any special requirements or questions, please feel free to reach out to us.

Thank you for choosing our shifting service. We look forward to assisting you with your move.

Best regards,
RoomLink
  `;

    await sendEmail(shift.email, 'Room Shifting Request Approved', message);
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
    const message = `Dear ${shift.name},
We regret to inform you that your room shifting request has been rejected. Please feel free to contact us for any further assistance.`;

    await sendEmail(shift.email, 'Shifting request rejected', message);

    return res
      .status(200)
      .json({ message: 'Shifting request rejected', shift });
  } catch (error) {
    console.log(error);
  }
};

const shiftingRequest = async (req, res) => {
  try {
    const pending = await shiftList
      .find({ status: 'Pending' })
      .sort({ _id: -1 });
    res.status(201).json({ pending });
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

const requestHistory = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const request = await shiftList.find({ userId: id }).sort({ _id: -1 });
    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch request history.' });
  }
};

const deleteShifting = async (req, res) => {
  try {
    const id = req.params.id;
    await shiftList.deleteOne({ _id: id });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const shiftingEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await shiftList.findById(id);
    res.json(request);
  } catch (error) {
    console.log(error);
  }
};

const editShifting = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      pickup: req.body.pickup,
      dropoff: req.body.dropoff,
      shiftingdate: req.body.shiftingdate,
      categories: req.body.categories,
      helper: req.body.helper,
      status: 'Pending'
    };
    const id = req.params.id;
    const response = await shiftList.findByIdAndUpdate(id, updatedData, {
      new: true
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  shiftRoom,
  shiftApprove,
  shiftReject,
  shiftingRequest,
  details,
  requestHistory,
  deleteShifting,
  shiftingEdit,
  editShifting,
  sendEmail
};
