const express = required("express")
const router = express.Router()
const shiftRequest = require("../controllers/shiftingRequest-controller")

router.route('/shiftRequest').post(shiftRequest);
