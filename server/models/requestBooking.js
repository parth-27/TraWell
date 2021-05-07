const mongoose = require("mongoose");
const RequestBookingSchema = new mongoose.Schema({
  bookingID: {
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
  carID: {
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
  booking_status: {
    type: Number,
    default: -1,
    required: true,
  },
});

const RequestBooking = mongoose.model("RequestBooking", RequestBookingSchema);
const rb1 = new RequestBooking({
  bookingID: "B3",
  lender_email: "shreyansh_shah@yahoo.com",
  borrower_email: "manav@gmail.com",
});

const rb2 = new RequestBooking({
  bookingID: "B2",
  lender_email: "parth@gmail.com",
  borrower_email: "shreyansh_shah@yahoo.com",
});

// rb1.save();
// rb1.save();
module.exports = RequestBooking;
