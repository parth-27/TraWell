const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");
const verifytoken = require("../controllers/verifytoken");

router.post("/addcar", verifytoken.verifyToken, carcontroller.addcar);
// router.post("/getcar", carcontroller.getCarfromLocationAndDate);
router.post("getcardetails", carcontroller.car_details);
router.post("/bookcar", carcontroller.bookcar);
router.get("/cardetails", carcontroller.car_details);
router.post("/requestbooking", verifytoken.verifyToken, carcontroller.requestbooking);
router.post("/cancelrequestbooking",verifytoken.verifyToken,carcontroller.cancelrequestbooking);
router.post("/filter", carcontroller.filter);
router.post("/editcardetails", verifytoken.verifyToken, carcontroller.updateCarDetails);
module.exports = router;
