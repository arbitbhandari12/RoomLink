const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  searchHistory: [{
    location: String,
    priceRange: [Number],
    type: String
     }],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      },
      process.env.JWT_SECRET_KEY
    );
  } catch (error) {
    console.error('Error generating token:', error); 
    throw new Error('Token generation failed.'); 
  }
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
