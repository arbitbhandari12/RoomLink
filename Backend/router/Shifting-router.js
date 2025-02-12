const express = require('express');
const router = express.Router();
const {
  shiftRoom,
  shiftApprove,
  shiftReject,
  shiftingRequest,
  details,
  requestHistory
} = require('../Controllers/shiftingRooms-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/shiftRequest').post(authMiddleware, shiftRoom);
router.route('/adminShift').get(shiftingRequest);
router.route('/shiftApprove/:id').post(shiftApprove);
router.route('/shiftReject/:id').post(shiftReject);
router.route('/shiftDetails/:id').get(details);
router.route('/requestHistory').get(authMiddleware, requestHistory);

module.exports = router;
