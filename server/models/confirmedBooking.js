const mongoose = require("mongoose");
const date = require("date-and-time");
const ConfirmedBookingSchema = new mongoose.Schema({
  bookingid: {
    type: String,
    required: true,
    unique: true,
  },
  lender_email: {
    type: String,
    required: true,
  },
  borrower_email: {
    type: String,
    required: true,
  },
  carid: {
    type: String,
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  trip_status: {
    type: Number,
    default: 0,
    required: true,
  },
  cancel: {
    type: Number,
    default: 0,
    required: true,
  },
});

const ConfirmedBooking = mongoose.model(
  "ConfirmedBooking",
  ConfirmedBookingSchema
);

const pattern = date.compile("YYYY-MM-DD");
var tod = date.format(new Date("2020-10-10"), pattern);
var fromd = date.format(new Date("2020-10-07"), pattern);
const cb1 = new ConfirmedBooking({
  bookingid: "B2",
  lender_email: "shreyansh_shah@yahoo.com",
  borrower_email: "jeet@gmail.com",
  carid: "C1",
  from_date: fromd,
  to_date: tod,
  rent: 5000,
});
// cb1.save();
module.exports = ConfirmedBooking;
