const express = require('express');
const router = express.Router();
const {
  shiftRoom,
  shiftApprove,
  shiftReject,
  shiftingRequest,
  details,
  requestHistory,
  shiftingEdit,
  editShifting
} = require('../Controllers/shiftingRooms-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/shiftRequest').post(authMiddleware, shiftRoom);
router.route('/adminShift').get(shiftingRequest);
router.route('/shiftApprove/:id').post(shiftApprove);
router.route('/shiftReject/:id').post(shiftReject);
router.route('/shiftDetails/:id').get(details);
router.route('/requestHistory').get(authMiddleware, requestHistory);
router.route('/shiftingEdit/:id').get(shiftingEdit);
router.route('/editShifting/:id').patch(editShifting);



module.exports = router;
