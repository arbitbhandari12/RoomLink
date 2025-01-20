const express = require('express');
const router = express.Router();
const shiftingRequest = require('../Controllers/shiftingRoom-controller');

router.route('/shiftRequest').post(shiftingRequest);

module.exports = router;
