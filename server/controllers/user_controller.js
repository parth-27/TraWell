require("dotenv").config();
const User = require("../models/user");
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailservice = require("../config/nodemailer");
const cryptoRandomString = require("crypto-random-string");
const date = require("date-and-time");
const Car = require("../models/car");
const ConfirmedBooking = require("../models/confirmedBooking");
const RequestedBooking = require("../models/requestBooking");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports.create = function (req, res) {
  console.log(req.body);
  try {
    Otp.findOne({ email: req.body.email }, async function (err, otp) {
      if (!otp) {
        console.log(`Server Error`);
        return res.status(404).json({ message: "server error" });
      }
      if (req.body.otp.otp != otp.code) {
        console.log("wrong otp");
        return res.status(302).json({ message: "Wrong OTP" });
      }
      var salt;
      var hashpwd;
      try {
        salt = await bcrypt.genSalt(10);
        hashpwd = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log(error);
      }
      console.log(hashpwd);
      const user_add = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd,
        phone_no: req.body.phone_no,
        address: req.body.address,
        pincode: req.body.pincode,
        city: req.body.city,
      });
      User.create(user_add, async function (err) {
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
      var token = jwt.sign({ id: user._id, email: user.email }, "Trawell", {
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
  console.log(req.userId);
  console.log(req.email);
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
        address: user.address,
        city: user.city,
        pincode: user.pincode,
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
      await emailservice.sendEmail(
        req.body.email,
        secretCode,
        (err, result) => {
          if (err) {
            console.error({ err });
          }
        }
      );
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
    User.findOne({ email: req.body.email }, async function (err, user) {
      if (err || !user) {
        res.status(404).json({ message: "Please enter valid email" });
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
      await emailservice.sendEmail(
        req.body.email,
        secretCode,
        (err, result) => {
          if (err) {
            console.error({ err });
          }
        }
      );
      res.status(200).json({ message: secretCode });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.verifyotp = async function (req, res) {
  try {
    Otp.findOne({ email: req.body.email }, async function (err, otp) {
      if (err || !otp) {
        return res.status(404).json({ message: "Error in finding user" });
      }
      if (req.body.otp.otp != otp.code) {
        console.log(req.body.email);
        return res.status(400).json({ message: "wrong otp" });
      }
      res.status(200).json({ message: "OTP verified" });
    });
  } catch (err) {
    console.log(err);
    res.status.json({ message: "Error in catch block" });
  }
};

module.exports.setnewpass = async function (req, res) {
  try {
    User.findOne({ email: req.body.email }, async function (err, user) {
      if (err || !user) {
        return res.status(400).json({ message: "Please enter valid email" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(req.body.password, salt);
      user.password = hashpwd;
      user.save(function (err) {
        if (err) {
          res.status(400).json({ message: "Error in updating the password" });
        }
      });
      res.status(200).json({ message: "Password changed successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.userrequests = async function (req, res) {
  let finaladdedcar;
  let finalrentedcar;
  try {
    Car.find({ lender_email: req.email }, async function (err, car) {
      if (err || !car) {
        return res.status(400).json({ message: "Server Error" });
      }
      if (car.length == 0) {
        return res.status(200).json({ message: "You have not added any car" });
      } else {
        finaladdedcar = car;
        //return res.status(200).json(car);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getaddedcar = async function (req, res) {
  console.log(req.body);
  try {
    await Car.find({ lender_email: req.email }, async function (err, car) {
      if (err || !car) {
        return res.status(400).json({ message: "Server Error" });
      }
      console.log(car);
      if (car.length == 0) {
        return res.status(200).json({ message: "You have not added any car" });
      } else {
        return res.status(200).json(car);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getrentedcar = async function (req, res) {
  try {
    var answer = [];
    const pattern = date.compile("YYYY-MM-DD");
    var d1 = date.format(new Date(), pattern);
    var temp_borrower;
    var temp_car;
    var temp_lender;
    await ConfirmedBooking.find(
      { borrower_email: req.email },
      async function (err, car) {
        if (err || !car) {
          return res.status(400).json({ message: "Server Error" });
        }
        if (car.length == 0) {
          return res
            .status(200)
            .json({ message: "You have not rented any car" });
        } else {
          await asyncforEach(car, async function (c) {
            var fromd = date.format(new Date(c.from_date), pattern);
            var tod = date.format(new Date(c.to_date), pattern);
            if (tod < d1) {
              c.trip_status = 0; //upcoming trip
            } else if (d1 < fromd) {
              c.trip_status = 1; //completed trip
            } else {
              c.trip_status = -1; //ongoing trip
            }
            await Car.findOne({ carid: c.carid }, async function (e, tempcar) {
              if (e || !tempcar) {
                console.log(e);
                return res.status(404).json({ message: "Error in car 1" });
              }
              temp_car = tempcar;
            });
            await User.findOne(
              { email: c.borrower_email },
              async function (er, temp_user) {
                if (er || !temp_user) {
                  console.log(er);
                  return res.status(404).json({ message: "Error in car 2" });
                }
                temp_borrower = temp_user;
              }
            );
            await User.findOne(
              { email: c.lender_email },
              async function (er, temp_user) {
                if (er || !temp_user) {
                  console.log(er);
                  return res.status(404).json({ message: "Error in car 2" });
                }
                temp_lender = temp_user;
              }
            );
            const temp_result = {
              booking_details: c,
              car_details: temp_car,
              borrower_details: temp_borrower,
              lender_details: temp_lender,
            };
            answer.push(temp_result);
          });
          return res.status(200).json(answer);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getlendedcar = async function (req, res) {
  try {
    var answer = [];
    const pattern = date.compile("YYYY-MM-DD");
    var d1 = date.format(new Date(), pattern);
    var temp_borrower;
    var temp_car;
    var temp_lender;
    await ConfirmedBooking.find(
      { lender_email: req.email },
      async function (err, car) {
        if (err || !car) {
          return res.status(400).json({ message: "Server Error" });
        }
        if (car.length == 0) {
          return res
            .status(200)
            .json({ message: "You have not lended any car" });
        } else {
          await asyncForEach(car, async function (c) {
            var fromd = date.format(new Date(c.from_date), pattern);
            var tod = date.format(new Date(c.to_date), pattern);
            if (tod < d1) {
              c.trip_status = 0;
            } else if (d1 < fromd) {
              c.trip_status = 1;
            } else {
              c.trip_status = -1;
            }
            await Car.findOne({ carid: c.carid }, async function (e, tempcar) {
              if (e || !tempcar) {
                console.log(e);
                return res.status(404).json({ message: "Error in car 1" });
              }
              temp_car = tempcar;
            });
            await User.findOne(
              { email: c.borrower_email },
              async function (er, temp_user) {
                if (er || !temp_user) {
                  console.log(er);
                  return res.status(404).json({ message: "Error in car 2" });
                }
                temp_borrower = temp_user;
              }
            );
            await User.findOne(
              { email: c.lender_email },
              async function (er, temp_user) {
                if (er || !temp_user) {
                  console.log(er);
                  return res.status(404).json({ message: "Error in car 2" });
                }
                temp_lender = temp_user;
              }
            );
            const temp_result = {
              booking_details: c,
              car_details: temp_car,
              borrower_details: temp_borrower,
              lender_details: temp_lender,
            };
            answer.push(temp_result);
          });
          res.status(200).json(answer);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getrequestedcar = async function (req, res) {
  try {
    var answer1 = [];
    let answer2 = [];
    const pattern = date.compile("YYYY-MM-DD");
    var d1 = date.format(new Date(), pattern);
    let temp_borrower;
    let temp_lender;
    await RequestedBooking.find(
      { lender_email: req.email },
      async function (err, lender_car) {
        if (err) {
          return res.status(400).json({ message: "server error" });
        }
        await asyncForEach(lender_car, async function (c) {
          var fromd = date.format(new Date(c.from_date), pattern);
          var tod = date.format(new Date(c.to_date), pattern);
          if (tod < d1) {
            c.trip_status = 0;
          } else if (d1 < fromd) {
            c.trip_status = 1;
          } else {
            c.trip_status = -1;
          }
          console.log(c);
          await Car.findOne({ carid: c.carID }, async function (e, tempcar) {
            if (e || !tempcar) {
              console.log(e);
              return res.status(404).json({ message: "Error in car 1" });
            }
            temp_car = tempcar;
          });
          await User.findOne(
            { email: c.borrower_email },
            async function (er, temp_user) {
              if (er || !temp_user) {
                console.log(er);
                return res.status(404).json({ message: "Error in car 2" });
              }
              temp_borrower = temp_user;
            }
          );
          await User.findOne(
            { email: c.lender_email },
            async function (er, temp_user) {
              if (er || !temp_user) {
                console.log(er);
                return res.status(404).json({ message: "Error in car 2" });
              }
              temp_lender = temp_user;
            }
          );
          const temp_result = {
            booking_details: c,
            car_details: temp_car,
            borrower_details: temp_borrower,
            lender_details: temp_lender,
          };
          answer1.push(temp_result);
        });
        // temp_lc = lender_car;
      }
    );
    await RequestedBooking.find(
      { borrower_email: req.email },
      async function (err, borrow_car) {
        if (err) {
          return res.status(400).json({ message: "Server Error" });
        }
        await asyncForEach(borrow_car, async function (c) {
          var fromd = date.format(new Date(c.from_date), pattern);
          var tod = date.format(new Date(c.to_date), pattern);
          if (tod < d1) {
            c.trip_status = 0;
          } else if (d1 < fromd) {
            c.trip_status = 1;
          } else {
            c.trip_status = -1;
          }
          await Car.findOne({ carid: c.carID }, async function (e, tempcar) {
            if (e || !tempcar) {
              console.log(e);
              return res.status(404).json({ message: "Error in car 1" });
            }
            temp_car = tempcar;
          });
          await User.findOne(
            { email: c.borrower_email },
            async function (er, temp_user) {
              if (er || !temp_user) {
                console.log(er);
                return res.status(404).json({ message: "Error in car 2" });
              }
              temp_borrower = temp_user;
            }
          );
          await User.findOne(
            { email: c.lender_email },
            async function (er, temp_user) {
              if (er || !temp_user) {
                console.log(er);
                return res.status(404).json({ message: "Error in car 2" });
              }
              temp_lender = temp_user;
            }
          );
          const temp_result = {
            booking_details: c,
            car_details: temp_car,
            borrower_details: temp_borrower,
            lender_details: temp_lender,
          };
          console.log(temp_result);
          answer2.push(temp_result);
          console.log(answer2);
        });
        // temp_bc = borrow_car;
      }
    );
    // await console.log(answer2);
    const result = {
      lendedby: answer1,
      borrowby: answer2,
    };
    console.log(result);
    await res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.updateprofile = function (req, res) {
  try {
    console.log(req.body);
    User.findOne({ email: req.email }, async function (err, user) {
      if (err || !user) {
        console.log(err);
        return res.status(400).json({ message: "server error" });
      }
      user.name = req.body.fullName;
      // (user.proile_picture = req.body.croppedImage),
      user.phone_no = req.body.phoneNumber;
      user.address = req.body.address;
      user.city = req.body.city;
      user.pincode = req.body.pincode;
      await user.save();
      return res
        .status(200)
        .json({ message: "User profile updated successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};
