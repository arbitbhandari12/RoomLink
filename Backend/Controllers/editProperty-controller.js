const propertyList = require('../models/propertyList-model');

const updateProperty = async (req, res) => {
  try {
    const user = req.user;
    const isAdmin = user.isAdmin;
    const id = req.params.id;

    let status = '';

    if (isAdmin == true) {
      status = 'Approved';
    } else {
      status = 'Pending';
    }

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      price: req.body.price,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
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
      status: status
    };

    if (req.files && req.files.length > 0) {
      const photoPaths = req.files.map((file) => file.path);
      updatedData.photos = photoPaths;
    }

    const updatedProperty = await propertyList.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    res.status(200).json({
      message: 'Property updated successfully!',
      property: updatedProperty
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update property.' });
  }
};

module.exports = updateProperty;
