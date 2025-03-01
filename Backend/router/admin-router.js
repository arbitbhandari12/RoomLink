const express = require('express');
const router = express.Router();
const {
  allUsers,
  deleteUsers,
  allproperty,
  detailsPage,
  approveProperty,
  rejectedProperty,
  userCount,
  propertyCount
} = require('../Controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/admin').get(authMiddleware, adminMiddleware);
router.route('/users').get(authMiddleware, adminMiddleware, allUsers);
router.route('/property').get(authMiddleware, adminMiddleware, allproperty);
router.route('/properties/:id').get(detailsPage);

router
  .route('/users/delete/:id')
  .delete(authMiddleware, adminMiddleware, deleteUsers);

router
  .route('/property/approve/:id')
  .post(authMiddleware, adminMiddleware, approveProperty);


  router
  .route('/property/rejected/:id')
  .post(authMiddleware, adminMiddleware, rejectedProperty);

  router
  .route('/userCount')
  .get(authMiddleware, adminMiddleware, userCount);

  router
  .route('/propertyCount')
  .get(authMiddleware, adminMiddleware, propertyCount);

module.exports = router;
