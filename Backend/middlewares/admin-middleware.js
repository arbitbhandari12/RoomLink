const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res.status(403).json({ msg: 'Not an admin' });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = adminMiddleware;
