const express = require('express');
const router = express.Router();
const addProperty = require('../Controllers/addproperty-controller');
const upload = require('../middlewares/multer-config');
const {
  userSideProperty,
  propertyPage,
  personalProperty,
  yourProperties,
  deleteProperty,
  editRoom,
  homeproperty
} = require('../controllers/userSideProperty-controller');
const updateProperty = require('../Controllers/editProperty-controller');
const similarProperty = require('../Controllers/SimilarProperty-controller');
const { Comment, getComment } = require('../Controllers/comments-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const {
  booking,
  bookingList,
  roomStatuss
} = require('../Controllers/BookingProperty-controller');

router.post('/addproperty', upload.array('photos', 10), addProperty);
router.route('/homelatest').get(homeproperty);
router.route('/available').get(userSideProperty);
router.route('/property/:id').get(propertyPage);
router.route('/myProperty').get(authMiddleware, personalProperty);
router.route('/yourProperties/:id').get(yourProperties);
router
  .route('/update/:id')
  .patch(authMiddleware, upload.array('photos', 10), updateProperty);
router.route('/similar/:id').get(authMiddleware, similarProperty);
router.route('/delete/:id').delete(authMiddleware, deleteProperty);
router.route('/editProperty/:id').get(authMiddleware, editRoom);
router.route('/booked-dates/:id').get(authMiddleware, booking);
router.route('/bookingList').get(authMiddleware, bookingList);
router.post('/booking/:id', booking);
router.patch('/roomStatus/:id', roomStatuss);
router.post('/comment/:id', authMiddleware, Comment);
router.route('/getComment/:id').get(getComment);

module.exports = router;
