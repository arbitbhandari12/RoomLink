const express = require('express');
const router = express.Router();
const shiftRoom = require('../Controllers/shiftingRequest-controller');

router.route('/shiftRequest').post(shiftRoom);

module.exports = router;
