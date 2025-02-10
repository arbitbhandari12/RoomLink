const User = require('../models/user-model');
const List = require('../models/propertyList-model');
const shiftRequest = require('../models/ShiftingRequest-model');
const approveShifting = require('../models/ShiftingApprove-model');

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
    const shifting = await shiftRequest.findById(id);
    if (!shifting) {
      return res.status(404).json({ message: 'Shifting request not found' });
    }
    await approveShifting.create({
      name: shifting.name,
      phone: shifting.phone,
      email: shifting.email,
      pickup: shifting.pickup,
      dropoff: shifting.dropoff,
      shiftingdate: shifting.shiftingdate,
      listofitems: shifting.listofitems,
      helper: shifting.helper
    });
    res.status(200).json({ msg: 'Approved shifting request successfully.' });
    await shiftRequest.deleteOne({ _id: id });
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
  approveshifting
};
