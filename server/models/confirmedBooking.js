const mongoose = require('mongoose')
const ConfirmedBookingSchema = new mongoose.Schema({
    bookingid:{
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
    carid:{
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
    // rent:{
    //     type:Number,
    //     required: true
    // },
    // booking_status:{
    //     type:Number,
    //     default:0
    // },
});

const ConfirmedBooking = mongoose.model('ConfirmedBooking',ConfirmedBookingSchema);
module.exports = ConfirmedBooking;