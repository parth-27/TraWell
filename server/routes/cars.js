const express = require('express');
const router = express.Router();
const carcontroller = require('../controllers/car_controller');
router.post('/addCar',carcontroller.add_car);
// router
module.exports = router;