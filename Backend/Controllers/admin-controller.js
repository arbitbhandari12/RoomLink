const User = require('../models/user-model');
const List = require('../models/propertyList-model');
const shiftRequest = require('../models/ShiftingRequest-model');
const PropertyList = require('../models/propertyList-model');

const allUsers = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// delete users
const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//Getting all property
const allproperty = async (req, res) => {
  try {
    const listProperty = await List.find({ status: 'Pending' });
    res.status(201).json({ listProperty });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// property detail page
const detailsPage = async (req, res) => {
  try {
    const property = await List.findById(req.params.id);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Property not found' });
  }
};

// Approved Property list
const approveProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await List.findByIdAndUpdate(
      id,
      {
        status: 'Approved'
      },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property Approved successfully', property });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//Rejected room
const rejectedProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await List.findByIdAndUpdate(
      id,
      {
        status: 'Rejected'
      },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property rejected successfully', property });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//Approve shifting request
const approveshifting = async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
};

//Rejecting shifting request
const rejectingShifting = async (req, res) => {
  try {
    const id = req.params.id;
    const shift = await shiftRequest.findByIdAndUpdate(
      id,
      { status: 'Rejected' },
      {
        new: true
      }
    );
    if (!shift) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

const userCount = async (req, res) => {
  try {
    const numberOfUser = await User.countDocuments();
    res.json(numberOfUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const propertyCount = async (req, res) => {
  try {
    const numberofProperty = await PropertyList.countDocuments();
    res.json(numberofProperty);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
  allUsers,
  deleteUsers,
  detailsPage,
  allproperty,
  approveProperty,
  rejectedProperty,
  approveshifting,
  rejectingShifting,
  userCount,
  propertyCount
};
