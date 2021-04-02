const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.create = async function(req,res){
    console.log(req.body);
    try{
        User.findOne({email:req.body.email},async function(err,user){
            if(user){
                console.log(`User with same email already exists`);
                return res.status(404).json({message:'User with same email exists'});                    
            }
            const salt = await bcrypt.genSalt(10);
            const hashpwd = await bcrypt.hash(req.body.password,salt);
            console.log(hashpwd);
            const user_add = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashpwd,
                phone_no: req.body.phone_no,
                address: req.body.email,
            })
            User.create(user_add,function(err){
                if(err){
                    console.log(`Error in adding the user to database`);
                    console.log(err);
                    return res.status(404).json({message:'error in adding user to db'});
                }
                console.log(`User Successfully created`);
                return res.status(200).json({message:'User successfully created'});
            })
        })        
    }catch(err){
        console.log(`Error in db connection`);
        return res.status(404).json({message:'Error in db connection'});
    }
}

module.exports.createSession = async function(req,res){
    try{
        User.findOne({email:req.body.email},async function(err,user){
            if(!user || err){
                console.log(`User doesnt exist`);
                return res.status(404).json({mesage:'User doesnt exis'});
            }
            const validPass = await bcrypt.compare(req.body.password,user.password);
            if(!validPass){
                return res.status(404).json({message:'Invalid Password'})
            }
            var token = jwt.sign({ id: user._id }, 'Trawell', {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).json({id:user._id,token:token});
        })
    }catch(err){
        console.log(`Error in db connerction`);
        res.status(404).json({message:'Error in db connection'});
    }
}

module.exports.profile = async function(req,res,next){
    try{
        User.findById(req.userId, async function(err,user){
            if(!user || err){
                console.log(`User doesnt exist`);
                return res.status(404).json({mesage:'User doesnt exis'});
            }
            console.log(req.userId);
            res.status(200).json({name:user.name});
        })
    }catch(err){
        console.log('Error in db connection');
        res.status(404).json({message:'Error in db connection'});
    }
}