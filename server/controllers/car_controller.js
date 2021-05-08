const cars = require("../models/car");
const confirmedbookings = require("../models/confirmedBooking");
const requestbookings = require("../models/requestBooking");
const date = require("date-and-time");
const user = require("../models/user");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports.addcar = function (req, res) {
  try {
    var count;
    var carid;
    var finalcity;
    user.find({ email: req.email }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({ message: "Server Error" });
      }
      finalcity = user[0].city;
    });
    cars.find({}, function (err, results) {
      count = results.length;
      count = count + 1;
      carid = "C" + count.toString();
      const newcar = new cars({
        carid: carid,
        pictures: req.body.croppedImage,
        registration_no: req.body.registration,
        rent: req.body.rent,
        deposite: req.body.deposit,
        company: req.body.company,
        modl: req.body.model,
        category: req.body.category,
        fuel_type: req.body.fuel,
        no_of_passengers: req.body.seats,
        color: req.body.color,
        engine_type: req.body.eng,
        features: req.body.features,
        to_date: req.body.to,
        from_date: req.body.from,
        city: finalcity,
        lender_email: req.email,
      });
      cars.create(newcar, function (err) {
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

// module.exports.getCarfromLocationAndDate = function (req, res) {
//   try {
//     const pattern = date.compile("YYYY-MM-DD");
//     var tod = date.format(new Date(req.body.to_date), pattern);
//     var fromd = date.format(new Date(req.body.from_date), pattern);
//     var dcars = [];
//     var ccar = [];
//     var fcar = [];
//     // confirmedbookings.find({fron_date:{'$gq':new Date()}})
//     confirmedbookings.find(
//       {
//         $or: [
//           {
//             $and: [{ from_date: { $lt: fromd } }, { to_date: { $gt: fromd } }],
//           },
//           { $and: [{ from_date: { $lt: tod } }, { to_date: { $gt: tod } }] },
//           { $and: [{ from_date: { $gt: fromd } }, { to_date: { $lt: tod } }] },
//         ],
//       },
//       function (err, bookings) {
//         if (err) {
//           console.log(err);
//           res.status(400).end();
//         }
//         bookings.forEach(function (item, index) {
//           dcars.push(item);
//         });
//         // console.log(dcars);
//         datecarobj = Object.assign({}, dcars);
//         // console.log(datecarobj);
//         cars.find(
//           {
//             $and: [
//               { city: req.body.city },
//               {
//                 $and: [
//                   { from_date: { $lt: fromd } },
//                   { to_date: { $gt: tod } },
//                 ],
//               },
//             ],
//           },
//           function (err, carwcity) {
//             if (err) {
//               console.log(err);
//               res.status(400).end();
//             }
//             carwcity.forEach(function (item, index) {
//               ccar.push(item);
//             });
//             citycarobj = Object.assign({}, ccar);
//             console.log(dcars);
//             console.log(ccar);
//             ccar.forEach(function (item, index) {
//               if (dcars.includes(item)) {
//               } else {
//                 fcar.push(item);
//               }
//             });
//             console.log(fcar);
//             return res.status(200).json(fcar);
//           }
//         );
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ message: "Error in catch block" });
//   }
// };

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
        $and: [
          {
            $or: [
              {
                $and: [
                  { from_date: { $lt: fromd } },
                  { to_date: { $gt: fromd } },
                ],
              },
              {
                $and: [{ from_date: { $lt: tod } }, { to_date: { $gt: tod } }],
              },
              {
                $and: [
                  { from_date: { $gt: fromd } },
                  { to_date: { $lt: tod } },
                ],
              },
            ],
          },
          { cancel: 0 },
        ],
      },
      function (err, bookings) {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        bookings.forEach(function (item, index) {
          dcars.push(item);
        });
        // console.log(dcars);
        datecarobj = Object.assign({}, dcars);
        // console.log(datecarobj);
        cars.find(
          {
            $and: [
              { city: req.body.city },
              {
                $and: [
                  { from_date: { $lt: fromd } },
                  { to_date: { $gt: tod } },
                ],
              },
            ],
          },
          function (err, carwcity) {
            if (err) {
              console.log(err);
              res.status(400).end();
            }
            carwcity.forEach(function (item, index) {
              ccar.push(item);
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
            return res.status(200).json(fcar);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.filter = async function (req, res) {
  try {
    console.log(req.body);
    const pattern = date.compile("YYYY-MM-DD");
    var tod = date.format(new Date(req.body.to), pattern);
    var fromd = date.format(new Date(req.body.from), pattern);
    var dcars = [];
    var ccar = [];
    var fcar = [];
    if (req.body.categories.length == 0) {
      req.body.categories = ["Hatchback", "Sedan", "SUV", "MUV"];
    }
    if (req.body.brand.length == 0) {
      req.body.brand = ["Hyundai", "Maruti Suzuki", "Mahindra", "Jeep", "Kia"];
    }
    if (req.body.fuel.length == 0) {
      req.body.fuel = ["Petrol", "Diesel", "Petrol + CNG", "Diesel + CNG"];
    }
    if (req.body.eng.length == 0) {
      req.body.eng = ["Manual", "Auto"];
    }
    if (req.body.seats.length == 0) {
      req.body.seats = [7, 5];
    }

    await confirmedbookings.find(
      {
        $and: [
          {
            $or: [
              {
                $and: [
                  { from_date: { $lt: fromd } },
                  { to_date: { $gt: fromd } },
                ],
              },
              {
                $and: [{ from_date: { $lt: tod } }, { to_date: { $gt: tod } }],
              },
              {
                $and: [
                  { from_date: { $gt: fromd } },
                  { to_date: { $lt: tod } },
                ],
              },
            ],
          },
          { cancel: 0 },
        ],
      },
      async function (err, bookings) {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        await asyncForEach(bookings, function (item) {
          dcars.push(item);
        });
        datecarobj = Object.assign({}, dcars);
        cars.find(
          {
            $and: [
              { city: req.body.city },
              { category: { $in: req.body.categories } },
              { company: { $in: req.body.brand } },
              { fuel_type: { $in: req.body.fuel } },
              { engine_type: { $in: req.body.eng } },
              { no_of_passengers: { $in: req.body.seats } },
            ],
          },
          async function (err, carwcity) {
            if (err) {
              console.log(err);
              res.status(400).end();
            }
            await asyncForEach(carwcity, function (item) {
              ccar.push(item);
            });
            citycarobj = Object.assign({}, ccar);
            await asyncForEach(ccar, async function (item) {
              if (dcars.includes(item)) {
              } else {
                await user.findOne(
                  { email: item.lender_email },
                  function (e, u) {
                    if (e || !u) {
                      return res
                        .status(404)
                        .json({ message: "Error in processing user" });
                    }
                    const ans = {
                      lender_details: u,
                      car_details: item,
                    };
                    fcar.push(ans);
                  }
                );
              }
            });
            return res.status(200).json(fcar);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.cancelconfirmedbooking = async function (req, res) {
  try {
    await confirmedbookings.findOne(
      { bookingid: req.body.bookingid },
      async function (err, cb) {
        if (err || !cb) {
          return res.status(400).json({ message: "Server Error" });
        }
        console.log(cb);
        cb.status = 1;
        await cb.save(function (e) {
          if (e) {
            console.log(`Error in processing cancel booking request`);
            return res
              .status(400)
              .json({ message: "Error in processing request" });
          }
          res.status(200).json({ message: "Successfully cancelled booking" });
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.acceptrequestbooking = async function (req, res) {
  try {
    const pattern = date.compile("YYYY-MM-DD");
    var d1;
    var d2;

    await requestbookings.findOne(
      { bookingID: req.body.bookingid },
      async function (error, rb) {
        if (err || !rb) {
          return res.status(400).json({ message: "Server error" });
        }
        rb.booking_status = 1;
        d1 = date.format(new Date(rb.to_date), pattern);
        d2 = date.format(new Date(rb.from_date), pattern);
        await rb.save(function (e) {
          if (e) {
            console.log("Error in processing cancel booking request");
            return res
              .status(400)
              .json({ message: "Error in processing cancel booking request" });
          }
        });
        const cb = new confirmedbookings({
          bookingid: rb.bookingID,
          lender_email: rb.lender_email,
          borrower_email: rb.borrower_email,
          carid: rb.carID,
          from_date: rb.from_date,
          to_date: rb.to_date,
          rent: rb.rent,
          trip_status: 0,
          cancel: 0,
        });
        await cb.save(function (e) {
          if (e) {
            console.log(`Error in processing cancel booking request`);
            return res
              .status(400)
              .json({ message: "Error in processing request" });
          }
        });
      }
    );
    await requestbookings.find(
      { carID: req.body.carid },
      async function (err, rb) {
        if (err || !rb) {
          return res
            .status(400)
            .json({ message: "Error in processing request" });
        }
        rb.forEach(function (item, index) {
          if (item.booking_status == -1) {
            var d3 = date.format(new Date(item.to_date), pattern);
            var d4 = date.format(new Date(item.from_date), pattern);
            if (d2 <= d3 <= d1 || d2 <= d4 <= d1 || d4 <= d2 <= d1 <= d3) {
              item.booking_status = 0;
            }
          }
        });
        await rb.save(function (e) {
          if (e) {
            console.log(`Error in processing cancel booking request`);
            return res
              .status(400)
              .json({ message: "Error in processing request" });
          }
          return res.status(200).json({ message: "Booking request accepted" });
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.cancelrequestbooking = async function (req, res) {
  try {
    await requestbookings.findOne(
      { bookingID: req.body.bookingid },
      async function (err, rb) {
        if (err || !rb) {
          return res.status(400).json({ message: "Server error" });
        }
        console.log(rb);
        rb.booking_status = 0;
        await rb.save(function (e) {
          if (e) {
            console.log("Error in processing cancel booking request");
            return res
              .status(400)
              .json({ message: "Error in processing cancel booking request" });
          }
          res
            .status(200)
            .json({ message: "Successfully cancelled booking request" });
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.requestbooking = async function (req, res) {
  try {
    await requestbookings.find({}, async function (err, rb) {
      if (err) {
        return res.status(400).json({ message: "Server error" });
      }
      var bookingcount = rb.length + 1;
      var bookingid = "B" + bookingcount.toString();
      const pattern = date.compile("YYYY-MM-DD");
      var d1 = date.format(new Date(req.body.to_date), pattern);
      var d2 = date.format(new Date(req.body.from_date), pattern);
      const days = date.subtract(d1, d2).toDays();
      const finalrent = days * req.body.rent;
      const newrequestedbooking = new requestbookings({
        bookingID: bookingid,
        lender_email: req.body.lender_email,
        borrower_email: req.email,
        carID: req.body.carid,
        from_date: d2,
        to_date: d1,
        rent: finalrent,
        booking_status: -1, //-1: request pending, 1:request accepted, 0:request rejected
      });
      await newrequestedbooking.save(function (e) {
        if (e) {
          console.log(`Error in processing request booking`);
          return res
            .status(404)
            .json({ message: "Error in processing request booking" });
        }
        res
          .status(200)
          .json({ message: "Successfully processed booking request" });
      });
    });
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
