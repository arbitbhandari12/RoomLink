const express = require('express');
const router = express.Router();
const addProperty = require('../controllers/addproperty-controller');
const upload = require('../middlewares/multer-config');
const {
  userSideProperty,
  propertyPage,
  personalProperty,
  yourProperties,
  deleteProperty,
  homeproperty
} = require('../controllers/userSideProperty-controller');
const booking = require('../Controllers/BookingProperty-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/addproperty', upload.array('photos', 10), addProperty);
router.route('/homelatest').get(homeproperty);
router.route('/available').get(userSideProperty);
router.route('/property/:id').get(propertyPage);
router.route('/myProperty').get(authMiddleware, personalProperty);
router.route('/yourProperties/:id').get(yourProperties);
router.route('/delete/:id').delete(authMiddleware, deleteProperty);
router.route('/booking').post(authMiddleware, booking);

module.exports = router;
