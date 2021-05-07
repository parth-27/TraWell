const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    carid:{
        type:String,
        required: true,
        unique: true,
    },
    pictures:{
        type:String,
        required:true,
    },
    registration_no:{
        type:String,
        required:true,
    },
    rent:{
        type:Number,
        required: true
    },
    deposite:{
        type:Number,
        required: true
    },
    company:{
        type:String,
        required: true
    },
    modl:{
        type:String,
        required: true
    },
    category:{
        type:String,
    },
    fuel_type:{
        type:String,
        required: true
    },
    no_of_passengers:{
        type:Number,
        required:true
    },
    color:{
        type:String,
    },
    engine_type:{
        type:String,
    },
    features:[{
        feature: String,
    }],
    city:{
        type:String,
        required:true
    },
    lender_email:{
        type:String,
        required:true
    },
    from_date: {
        type: Date,
        required: true,
    },
    to_date: {
        type: Date,
        required: true,
    },
});

const Car = mongoose.model('Car',carSchema);
module.exports=Car;