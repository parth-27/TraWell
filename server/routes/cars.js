const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");
const verifyToken = require("../controllers/verifytoken");

router.post("/addcar", verifyToken, carcontroller.addcar);
router.post("/getcar", carcontroller.getCarfromLocationAndDate);
router.post("/bookcar", carcontroller.bookcar);
router.get("/cardetails", carcontroller.car_details);
module.exports = router;
