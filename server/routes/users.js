const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user_controller')
const verifyToken = require('../controllers/verifytoken');

router.post('/create',usercontroller.create);
// router.post('/signin',usercontroller.signin);
router.post('/createsession',usercontroller.createSession);
router.get('/profile',verifyToken,usercontroller.profile);
module.exports=router;