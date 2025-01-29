const approve = require('../models/propertyapprove-model');

const homeproperty = async (req, res) => {
  try {
    const latestItems = await approve
      .find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5); // Limit to 5 results
    res.status(200).json(latestItems);
  } catch (error) {}
};

//all property available page that are approved
const userSideProperty = async (req, res) => {
  try {
    const approved = await approve.find({});
    res.status(201).json({ approved });
  } catch (error) {
    console.log(error);
  }
};

// property detail page
const propertyPage = async (req, res) => {
  try {
    const property = await approve.findById(req.params.id);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Property not found' });
  }
};

//User Personal property to edit or delete or to check how many property user have listed
const personalProperty = async (req, res) => {
  try {
    const userData = req.user;
    const myProperty = await approve.find({ email: userData.email });
    res.json(myProperty);
  } catch (error) {
    res.status(500).json({ error: 'Property not found' });
  }
};

const yourProperties = async (req, res) => {
  try {
    const details = await approve.findById(req.params.id);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Property not found' });
  }
};

//delete property by property owner
const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    await approve.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

//edit by property owner
const editRoom = async (req, res) => {
  try {
    const edit = await approve.findById(req.params.id);
    res.json(edit);
  } catch (error) {
    res.status(500).json({ error: 'Property not found' });
  }
};

module.exports = {
  homeproperty,
  userSideProperty,
  propertyPage,
  personalProperty,
  yourProperties,
  deleteProperty,
  editRoom
};
