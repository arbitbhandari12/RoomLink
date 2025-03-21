const PropertyList = require('../models/propertyList-model');

const homeproperty = async (req, res) => {
  try {
    const latestItems = await PropertyList.find({ status: 'Approved' })
      .sort({ _id: -1 })
      .limit(5); // Limit to 5 results
    res.status(200).json(latestItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const userSideProperty = async (req, res) => {
  try {
    const properties = await PropertyList.find({ status: 'Approved' }).sort({
      _id: -1
    });
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
// property detail page
const propertyPage = async (req, res) => {
  try {
    const property = await PropertyList.findById(req.params.id);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//User Personal property to edit or delete or to check how many property user have listed
const personalProperty = async (req, res) => {
  try {
    const userData = req.user;
    const myProperty = await PropertyList.find({ userId: userData._id }).sort({
      _id: -1
    });
    res.json(myProperty);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//personal property of user details page
const yourProperties = async (req, res) => {
  try {
    const details = await PropertyList.findById(req.params.id);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//delete property by property owner
const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    await PropertyList.deleteOne({ _id: id });
    res.status(200).json({ msg: 'Delete Property successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

//edit by property owner
const editRoom = async (req, res) => {
  try {
    const edit = await PropertyList.findById(req.params.id);
    res.json(edit);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


module.exports = {
  homeproperty,
  userSideProperty,
  propertyPage,
  personalProperty,
  yourProperties,
  deleteProperty,
  editRoom,
};
