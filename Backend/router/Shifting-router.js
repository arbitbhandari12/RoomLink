const express = require('express');
const router = express.Router();
const {
  shiftRoom,
  shiftApprove
} = require('../Controllers/shiftingRooms-controller');
const {
  shiftingRequest,
  details
} = require('../Controllers/shiftingRooms-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/shiftRequest').post(authMiddleware, shiftRoom);
router.route('/shiftApprove/:id').post(shiftApprove);
router.route('/adminShift').get(shiftingRequest);
router.route('/shiftDetails/:id').get(details);

module.exports = router;
