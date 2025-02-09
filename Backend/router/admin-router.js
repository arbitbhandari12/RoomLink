const express = require('express');
const router = express.Router();
const {
  allUsers,
  deleteUsers,
  allproperty,
  detailsPage,
  deleteProperty,
  approveProperty,
  rejectedProperty,
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

module.exports = router;
