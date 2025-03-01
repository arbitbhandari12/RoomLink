const PropertyList = require('../models/propertyList-model');

const homeproperty = async (req, res) => {
  try {
    const latestItems = await PropertyList.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5); // Limit to 5 results
    res.status(200).json(latestItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const userSideProperty = async (req, res) => {
  try {
    const properties = await PropertyList.find({ status: 'Approved' });
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

//Booking
const createBooking = async (req) => {
  try {
    const { name, email, contact, bookingDate } = req.body;

    if (!name || !email || !contact || !bookingDate) {
      return { success: false, message: 'All fields are required' };
    }

    const formattedDate = new Date(bookingDate);
    if (isNaN(formattedDate.getTime())) {
      return { success: false, message: 'Invalid date format' };
    }

    const newBooking = new Booking({
      name,
      email,
      contact,
      bookingDate: formattedDate
    });
    await newBooking.save();

    return { success: true, message: 'Booking successful', data: newBooking };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving booking',
      error: error.message
    };
  }
};

//feedback
const submitFeedback = async (req) => {
  try {
    const userId = req.user.id;
    const { comment } = req.body;

    if (!userId || !comment) {
      return { success: false, message: 'All fields are required' };
    }

    const newFeedback = new Feedback({ userId, comment });
    await newFeedback.save();

    return {
      success: true,
      message: 'Feedback submitted successfully',
      data: newFeedback
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error submitting feedback',
      error: error.message
    };
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
  createBooking,
  submitFeedback
};
