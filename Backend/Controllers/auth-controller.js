const User = require('../models/user-model');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const booking = require('../models/Booking-model');
const Booking = require('../models/Booking-model');

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
        userId: existingUser._id.toString()
      });
    } else {
      res.status(401).json({ msg: 'Password not valid.' });
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

const forgot = async (req, res) => {
  const email = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ error: "User doesn't exists" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      username: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };
    await User.findByIdAndUpdate(id, updatedData, { new: true });
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

module.exports = {
  home,
  register,
  login,
  user,
  forgot,
  updateProfile,
  changePassword,
};
