const User = require('../models/user-model');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Booking = require('../models/Booking-model');
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
  } catch (error) {
    console.error('Error sending email:', error.message);
    if (error.response) {
      console.error('Error response:', error.response);
    }
  }
};

const home = async (req, res) => {
  try {
    res.send('This is home page using router');
  } catch (error) {
    console.log(error);
  }
};

// Register User

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(req.body); // Log the incoming request to see what's being sent

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists');
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      phone,
      password: hash_password
    });
    res.status(201).json({
      msg: 'User registered successfully',
      token: await newUser.generateToken(),
      userId: newUser._id.toString()
    });
    const message = `Dear ${newUser.username},  
Thank you for registering with us. Your account has been successfully created.  

You can now log in to your account and enjoy our services.  

Best regards,  
RoomLink`;

    await sendEmail(newUser.email, 'Welcome to Our Service', message);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//Completed Register User

//Login User

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: 'Do register first' });
    }
    const user = await bcrypt.compare(password, existingUser.password);
    if (user) {
      res.status(200).json({
        msg: 'User Login successfully',
        token: await existingUser.generateToken(),
        userId: existingUser._id.toString(),
        isAdmin: existingUser.isAdmin.toString()
      });
    } else {
      res.status(401).json({ msg: 'Username or Password is not valid.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//Completed Login User

//To check currently login user

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone
    };
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res
      .status(200)
      .json({ message: 'Profile updated successfully.', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Booking.deleteOne({ _id: id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 300000; // OTP expires in 5 minutes

    // Save the updated user instance
    await user.save();

    // Create a transporter object with hardcoded email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arbitbhandari17@gmail.com',
        pass: 'qbkp vpvk cwuz glcj'
      }
    });

    // Send OTP email
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset OTP',
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p><p>This OTP will expire in 5 minutes.</p>`
    });

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const otpVerification = async (req, res) => {
  try {
    const { email, code } = req.body;
    console.log(code);

    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== code || Date.now() > user.resetOtpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

module.exports = {
  home,
  register,
  login,
  user,
  updateProfile,
  changePassword,
  cancelBooking,
  forgotPassword,
  otpVerification,
  resetPassword,
  sendEmail
};
