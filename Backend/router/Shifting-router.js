const express = require('express');
const router = express.Router();
const shiftRoom = require('../Controllers/shiftingRequest-controller');
const adminShift = require('../Controllers/adminShift-controller');

router.route('/shiftRequest').post(shiftRoom);
router.route('/adminShift').get(adminShift);

module.exports = router;
