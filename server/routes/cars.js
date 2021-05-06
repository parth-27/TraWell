const express = require('express');
const router = express.Router();
const carcontroller = require('../controllers/car_controller');

const multer = require('multer');
const store = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});

const upload = multer({ storage: store });

router.post('/addcar', upload.single('file'), carcontroller.addcar);
router.post('/getcar',carcontroller.getCarfromLocationAndDate);
router.post('/bookcar',carcontroller.bookcar);
router.get('/cardetails',carcontroller.car_details);
// router
module.exports = router;