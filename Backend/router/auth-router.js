const express = require('express');
const router = express.Router();
const {
  home,
  register,
  login,
  user,
  updateProfile,
  changePassword,
} = require('../Controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(home);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(authMiddleware, user);
router.route('/updateProfile/:id').patch(authMiddleware, updateProfile);
router.route('/changePassword').patch(authMiddleware, changePassword);

module.exports = router;
