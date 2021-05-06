const cars = require("../models/car");
const confirmedbookings = require("../models/confirmedBooking");
const requestbookings = require("../models/requestBooking");
const date = require("date-and-time");
const user = require("../models/user");
module.exports.addcar = function (req, res) {
  try {
    var count;
    var carid;
    let finalcity;
    user.find({ email: req.email }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({ message: "Server Error" });
      }
      finalcity = user.city;
    });
    cars.find({}, function (err, results) {
      count = results.length;
      count = count + 1;
      carid = "C" + count.toString();
      const newcar = new cars({
        carid: carid,
        city: finalcity,
        lender_email: req.email,
      });
      newcar.save(function (err) {
        if (err) {
          console.log("Error in adding the car to database");
          console.log(err);
          return res.status(404).end();
        } else {
          console.log("Car successfully added to the database");
          return res.status(200).end();
        }
      });
    });
  } catch (err) {
    console.log("Error in catch block");
    return res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.car_details = function (req, res) {
  try {
    cars.findOne({ carid: req.body.carid }, function (err, car) {
      if (err || !car) {
        console.log(`Error in finding car`);
        return res.status(404).json({ message: "Error in finding car" });
      }
      console.log(car);
      return res.status(200).json(car);
    });
  } catch (err) {
    console.log("Error in catch block");
    return res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getCarfromLocationAndDate = function (req, res) {
  try {
    const pattern = date.compile("YYYY-MM-DD");
    var tod = date.format(new Date(req.body.to_date), pattern);
    var fromd = date.format(new Date(req.body.from_date), pattern);
    var dcars = [];
    var ccar = [];
    var fcar = [];
    // confirmedbookings.find({fron_date:{'$gq':new Date()}})
    confirmedbookings.find(
      {
        $or: [
          {
            $and: [{ from_date: { $lt: fromd } }, { to_date: { $gt: fromd } }],
          },
          { $and: [{ from_date: { $lt: tod } }, { to_date: { $gt: tod } }] },
        ],
      },
      function (err, bookings) {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        bookings.forEach(function (item, index) {
          dcars.push(item.carid);
        });
        // console.log(dcars);
        datecarobj = Object.assign({}, dcars);
        // console.log(datecarobj);
        cars.find({ city: req.body.city }, function (err, carwcity) {
          if (err) {
            console.log(err);
            res.status(400).end();
          }
          carwcity.forEach(function (item, index) {
            ccar.push(item.carid);
          });
          citycarobj = Object.assign({}, ccar);
          console.log(dcars);
          console.log(ccar);
          ccar.forEach(function (item, index) {
            if (dcars.includes(item)) {
            } else {
              fcar.push(item);
            }
          });
          console.log(fcar);
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.bookcar = function (req, res) {
  try {
    confirmedbookings.find({}, function (err, bookings) {
      var bookingcount = bookings.length + 1;
      var bookingid = "B" + bookingcount.toString();
      const pattern = date.compile("YYYY-MM-DD");
      var d1 = date.format(new Date(req.body.to_date), pattern);
      var d2 = date.format(new Date(req.body.from_date), pattern);
      const newbooking = new confirmedbookings({
        bookingid: bookingid,
        lender_email: req.body.lender_email,
        borrower_email: req.body.borrower_email,
        carid: req.body.carid,
        from_date: d2,
        to_date: d1,
      });
      newbooking.save(function (err) {
        if (err) {
          console.log(err);
          console.log(`Error in new booking`);
          res.status(400).end();
        }
        res.status(200).end();
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};
