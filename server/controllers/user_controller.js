const User = require("../models/user");
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailservice = require("../config/nodemailer");
const cryptoRandomString = require("crypto-random-string");

module.exports.create = async function (req, res) {
  //   console.log(req.body);
  try {
    Otp.findOne({ email: req.body.email }, async function (err, otp) {
      if (!otp) {
        console.log(`Server Error`);
        return res.status(404).json({ message: "server error" });
      }
      if (req.body.otp.otp != otp.code) {
        return res.status(404).json({ message: "Wrong OTP" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(req.body.password, salt);
      console.log(hashpwd);
      const user_add = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd,
        phone_no: req.body.phone_no,
        address: req.body.email,
      });
      User.create(user_add, function (err) {
        if (err) {
          console.log(`Error in adding the user to database`);
          console.log(err);
          return res
            .status(404)
            .json({ message: "error in adding user to db" });
        }
        console.log(`User Successfully created`);
        return res.status(200).json({ message: "User successfully created" });
      });
    });
  } catch (err) {
    console.log(`Error in db connection`);
    return res.status(404).json({ message: "Error in db connection" });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    User.findOne({ email: req.body.email }, async function (err, user) {
      if (!user || err) {
        console.log(`User doesnt exist`);
        return res.status(404).json({ mesage: "User doesnt exis" });
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(404).json({ message: "Invalid Password" });
      }
      var token = jwt.sign({ id: user._id }, "Trawell", {
        expiresIn: 86400, // expires in 24 hours
      });
      return res.status(200).json({ id: user._id, accessToken: token });
    });
  } catch (err) {
    console.log(`Error in db connerction`);
    res.status(404).json({ message: "Error in db connection" });
  }
};

module.exports.profile = async function (req, res, next) {
  try {
    User.findById(req.userId, async function (err, user) {
      if (!user || err) {
        console.log(`User doesnt exist`);
        return res.status(404).json({ mesage: "User doesnt exis" });
      }
      console.log(req.userId);
      res.status(200).json({
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        address:user.address
      });
    });
  } catch (err) {
    console.log("Error in db connection");
    res.status(404).json({ message: "Error in db connection" });
  }
};

module.exports.userverifymail = async function (req, res) {
  try {
    User.findOne({ email: req.body.email }, async function (err, user) {
      if (user) {
        console.log(`User already exists`);
        return res.status(404).json({ message: "User already exists" });
      }
      Otp.deleteMany({ email: req.body.email }, async function (err) {
        if (err) {
          console.log(err);
          return res.status(404).json({ message: "No user" });
        }
      });
      const secretCode = cryptoRandomString({
        length: 6,
      });
      const newCode = new Otp({
        code: secretCode,
        email: req.body.email,
      });
      newCode.save();
      const data = {
        from: '"Shreyansh Shah" <shreyansh_shah@yahoo.com>',
        to: req.body.email,
        subject: "TraWell: Verify OTP",
        text: secretCode,
        html: `<b>Your OTP: ${secretCode}</b>`,
      };
      await emailservice.sendMail(data);
      res.status(200).json({ message: secretCode });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.resetpassmail = async function (req, res) {
  try {
    console.log(req.body);
      User.findOne({email:req.body.email},async function(err,user){
          if(err || !user){
              res.status(404).json({message:'Please enter valid email'});
          }
          Otp.deleteMany({ email: req.body.email }, async function (err) {
            if (err) {
              console.log(err);
              return res.status(404).json({ message: "No user" });
            }
          });
          const secretCode = cryptoRandomString({
            length: 6,
          });
          const newCode = new Otp({
            code: secretCode,
            email: req.body.email,
          });
          newCode.save();
          const data = {
            from: '"Shreyansh Shah" <shreyansh_shah@yahoo.com>',
            to: req.body.email,
            subject: "TraWell: Verify OTP",
            text: secretCode,
            html: `<b>Your OTP: ${secretCode}</b>`,
          };
          await emailservice.sendMail(data);
          res.status(200).json({ message: secretCode });    
      })
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.verifyotp = async function(req,res){
    try{
        Otp.findOne({email:req.body.email},async function(err,otp){
            if(err || !otp){
                return res.status(404).json({message:'Error in finding user'});
            }
            if(req.body.otp.otp!=otp.code){
                return res.status(400).json({message:'wrong otp'});
            }
            res.status(200).json({message:'OTP verified'});
        })
    }catch(err){
        console.log(err);
        res.status.json({message:'Error in catch block'});
    }
}

module.exports.setnewpass = async function(req,res){
    try{
        User.findOne({email:req.body.email},async function(err,user){
            if(err || !user){
                return res.status(400).json({message:"Please enter valid email"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashpwd = await bcrypt.hash(req.body.password, salt);                  
            user.password=hashpwd;
            user.save(function(err){
                if(err){
                    res.status(400).json({message:'Error in updating the password'});
                }
            })
            res.status(200).json({message:'Password changed successfully'});
        })
    }catch(err){
        console.log(err);
        res.status(404).json({message:'Error in catch block'});
    }
}