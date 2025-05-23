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
const { Comment, getComment, deleteComment } = require('../Controllers/comments-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const {
  booking,
  bookingList,
  roomStatuss,
  landloardBooking
} = require('../Controllers/BookingProperty-controller');

router
  .route('/addproperty')
  .post(upload.array('photos', 10), authMiddleware, addProperty);
router.route('/homelatest').get(homeproperty);
router.route('/available').get(userSideProperty);
router.route('/property/:id').get(propertyPage);
router.route('/myProperty').get(authMiddleware, personalProperty);
router.route('/yourProperties/:id').get(yourProperties);
router
  .route('/update/:id')
  .patch(authMiddleware, upload.array('photos', 10), updateProperty);
router.route('/similar/:id').get(similarProperty);
router.route('/delete/:id').delete(authMiddleware, deleteProperty);
router.route('/editProperty/:id').get(authMiddleware, editRoom);
router.route('/booked-dates/:id').get(authMiddleware, booking);
router.route('/bookingList').get(authMiddleware, bookingList);
router.route('/landloardBooking').get(authMiddleware, landloardBooking);
router.route('/booking/:id').post(authMiddleware, booking);
router.patch('/roomStatus/:id', roomStatuss);
router.post('/comment/:id', authMiddleware, Comment);
router.delete('/deleteComment/:commentId', authMiddleware, deleteComment);
router.route('/getComment/:id').get(getComment);

module.exports = router;
