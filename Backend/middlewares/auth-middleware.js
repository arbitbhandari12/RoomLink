const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'unauthorized token' });
  }

  const jwtToken = token.replace('Bearer', '').trim();

  try {
    const isverified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isverified.email }).select({
      password: 0
    });

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized token' });
  }
};
module.exports = authMiddleware;
