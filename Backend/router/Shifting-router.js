const express = require('express');
const router = express.Router();
const shiftRoom = require('../Controllers/shiftingRequest-controller');
const { shiftingRequest, details } = require('../Controllers/adminShift-controller');

router.route('/shiftRequest').post(shiftRoom);
router.route('/adminShift').get(shiftingRequest);
router.route('/shiftDetails/:id').get(details);

module.exports = router;
