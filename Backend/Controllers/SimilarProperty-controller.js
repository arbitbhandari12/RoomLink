const propertyList = require('../models/propertyList-model');

const similarProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const selectedRoom = await propertyList.findById(id);

    if (!selectedRoom) {
      console.log('No room found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    const priceRange = selectedRoom.price * 0.2;
    const minPrice = selectedRoom.price - priceRange;
    const maxPrice = selectedRoom.price + priceRange;

    let similarRooms = await propertyList
      .find({
        location: selectedRoom.location,
        price: { $gte: minPrice, $lte: maxPrice },
        type: selectedRoom.type,
        status: 'Approved',
        _id: { $ne: id }
      })
      .limit(4);

    if (similarRooms.length < 4) {
      similarRooms = await propertyList
        .find({
          status: 'Approved',
          $or: [
            { location: selectedRoom.location },
            { price: { $gte: minPrice, $lte: maxPrice } },
            { type: selectedRoom.type }
          ],
          _id: { $ne: id }
        })
        .limit(4);
    }

    if (similarRooms.length < 4) {
      similarRooms = await propertyList
        .find({ status: 'Approved', _id: { $ne: id } })
        .limit(4);
    }
    res.json(similarRooms);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = similarProperty;
