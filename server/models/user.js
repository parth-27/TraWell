const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports=User;