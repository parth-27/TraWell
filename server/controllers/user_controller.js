const User = require('../models/user'); 

module.exports.create = function(req,res){
    console.log(req.body);
    User.create(req.body,function(err){
        if(err){
            console.log(err);
        }else{
            console.log(`User created`);
        }
    })
    // if(req.body.password != req.body.confirm_password){
    //     // return res.redirect('/users/signup');
    //     console.log(`Password does not match`);
    // }
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log(`Error in finding user in signing up`);
    //         return;
    //     }
    //     if(!user){
    //         console.log(`User created`);
    //         // User.create(req.body,function(err){
    //         //     if(err){
    //         //         console.log(`Error in signing up user`);
    //         //         return;
    //         //     }
    //         //     return res.redirect('/users/signin');
    //         // });
    //     }else{
    //         console.log(`Error in creating user`);
    //         // return res.redirect('/users/signup');
    //     }
    // })
}