const express = require('express');
const router = express.Router();
const carcontroller = require('../controllers/car_controller');
router.post('/addcar',carcontroller.addcar);
router.post('/getcar',carcontroller.getCarfromLocationAndDate);
router.post('/bookcar',carcontroller.bookcar);
// router
module.exports = router;