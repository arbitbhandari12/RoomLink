const List = require('../models/propertyList-model');

const addProperty = async (req, res) => {
  try {
    const user = req.user;
    const admin = user.isAdmin;

    let status = '';

    if (admin == true) {
      status = 'Approved';
    } else {
      status = 'Pending';
    }
    // Create an array of file paths for the uploaded photos
    const photoPaths = req.files.map((file) => file.path);

    await List.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      price: req.body.price,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      photos: photoPaths,
      kitchen: req.body.kitchen,
      parking: req.body.parking,
      balcony: req.body.balcony,
      furnishing: req.body.furnishing,
      water: req.body.water,
      school: req.body.school,
      temple: req.body.temple,
      healthcare: req.body.healthcare,
      park: req.body.park,
      bank: req.body.bank,
      transport: req.body.transport,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      status: status,
      userId: user._id
    });

    // Send success response
    res.status(201).json({ message: 'Property added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add property.' });
  }
};

module.exports = addProperty;
