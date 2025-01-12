const List = require('../models/propertyList-model'); // Import the List model

const addProperty = async (req, res) => {
  try {
    // Create an array of file paths for the uploaded photos
    const photoPaths = req.files.map((file) => file.path);

    // Create a new property listing using the data from the request body
    const newProperty = await List.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      price: req.body.price,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      photos: photoPaths, // Save the array of file paths
      kitchen: req.body.kitchen,
      parking: req.body.parking,
      balcony: req.body.balcony,
      furnishing: req.body.furnishing,
      water: req.body.water,
      school: req.body.school,
      temple: req.body.temple,
      healthcare: req.body.healthcare,
      park: req.body.park,
      bank:req.body.bank,
      transport: req.body.transport,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    });

    // Save the property to the database

    // Send success response
    res.status(201).json({ message: 'Property added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add property.' });
  }
};

module.exports = addProperty;
