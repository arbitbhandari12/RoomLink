const express = require('express');
const router = express.Router();
const {
  home,
  register,
  login,
  user,
} = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(home);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(authMiddleware, user);

module.exports = router;
