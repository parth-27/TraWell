const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    carid:{
        type:String,
        required: true,
        unique: true,
    },
    // pictures:[{type:Buffer,required:true}],
    // registration_no:{
    //     type:String,
    //     required:true,
    // },
    //     rent:{
    //     type:Number,
    //     required: true
    // },
    // rating:{
    //     type: Number,
    //     default: 0
    // },
    // company:{
    //     type:String,
    //     required: true
    // },
    // modl:{
    //     type:String,
    //     required: true
    // },
    // category:[{
    //     type:String,
    // }],
    // fuel_type:{
    //     type:String,
    //     required: true
    // },
    // no_of_passengers:{
    //     type:Number,
    //     required:true
    // },
    // color:{
    //     type:String,
    // },
    // features:[{
    //     type:String,
    // }],
    // plan:{
    //     type:Number,
    //     default:60
    // },
    city:{
        type:String,
        required:true
    },
    lender_email:{
        type:String,
        required:true
    }
});

const Car = mongoose.model('Car',carSchema);
module.exports=Car;