const mongoose = require('mongoose')
const RequestBookingSchema = new mongoose.Schema({
    bookingID:{
        type:String,
        required: true,
        unique: true,
    },
    lender_email:{
        type:String,
        required:true
    },
    borrower_email:{
        type:String,
        required:true
    },
    carID:{
        type:String,
        required:true,
    },
    from_date:{
        type:Date,
        required: true
    },
    to_date:{
        type:Date,
        required: true
    },
    rent:{
        type:Number,
        required: true
    },
    booking_status:{
        type:Number,
        default:0
    },
});

const RequestBooking = mongoose.model('RequestBooking',RequestBookingSchema);
module.exports = RequestBooking;