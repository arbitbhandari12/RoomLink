const User = require('../models/user-model');
const approve = require('../models/propertyapprove-model');
const List = require('../models/propertyList-model');

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
    const listProperty = await List.find({});
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

// Rejecting Property

const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    await List.deleteOne({ _id: id });
    res.status(200).json({ msg: 'Delete Property successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Approved Property list
const approveProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await List.findOne({ _id: id });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await approve.create({
      title: property.title,
      description: property.description,
      type: property.type,
      location: property.location,
      price: property.price,
      bedroom: property.bedroom,
      bathroom: property.bathroom,
      photos: property.photos,
      kitchen: property.kitchen,
      parking: property.parking,
      balcony: property.balcony,
      furnishing: property.furnishing,
      water: property.water,
      school: property.school,
      temple: property.temple,
      healthcare: property.healthcare,
      park: property.park,
      transport: property.transport,
      bank: property.bank,
      name: property.name,
      phone: property.phone,
      email: property.email
    });
    res.status(200).json({ msg: 'Approved Property successfully.' });
    await List.deleteOne({ _id: id });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
  allUsers,
  deleteUsers,
  detailsPage,
  allproperty,
  deleteProperty,
  approveProperty
};
