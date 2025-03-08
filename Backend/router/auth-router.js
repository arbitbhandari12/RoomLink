const express = require('express');
const router = express.Router();
const {
  home,
  register,
  login,
  user,
  updateProfile,
  changePassword,
  cancelBooking,
  forgotPassword,
  otpVerification,
  resetPassword
} = require('../Controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(home);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(authMiddleware, user);
router.route('/updateProfile/:id').patch(authMiddleware, updateProfile);
router.route('/changePassword').patch(authMiddleware, changePassword);
router.route('/cancelBooking/:id').delete(authMiddleware, cancelBooking);
router.route('/forgotPassword').post(forgotPassword);
router.route('/otpVerification').post(otpVerification);
router.route('/resetPassword').post(resetPassword);


module.exports = router;
