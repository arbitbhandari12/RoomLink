const propertyList = require('../models/propertyList-model');

const similarProperty = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Fetching similar rooms for property ID:', id);

    const selectedRoom = await propertyList.findById(id);
    console.log('Selected room:', selectedRoom);

    if (!selectedRoom) {
      console.log('No room found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    const similarRooms = await propertyList.find({
      location: selectedRoom.location,
      price: selectedRoom.price,
      _id: { $ne: id }
    }).limit(4);

    if (similarRooms.length === 0) {
      console.log('No similar rooms found for property:', selectedRoom.title);
      return res.status(404).json({ message: 'No similar properties found' });
    }

    res.json(similarRooms);
  } catch (error) {
    console.error('Error fetching similar rooms:', error.message);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = similarProperty;
