const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/Roomlink';

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(0);
  }
};

module.exports = connectDB;
