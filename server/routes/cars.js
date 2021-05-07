const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");
const verifyToken = require("../controllers/verifytoken");

router.post("/addcar", verifyToken, carcontroller.addcar);
router.post("/getcar", carcontroller.getCarfromLocationAndDate);
router.post("getcardetails", carcontroller.car_details);
router.post("/bookcar", carcontroller.bookcar);
router.get("/cardetails", carcontroller.car_details);
router.post("/requestbooking", verifyToken, carcontroller.requestbooking);
router.post(
  "/cancelrequestbooking",
  verifyToken,
  carcontroller.cancelrequestbooking
);
router.post("/filter", carcontroller.filter);
module.exports = router;
