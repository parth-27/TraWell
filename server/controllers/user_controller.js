const User = require('../models/user'); 

module.exports.create = function(req,res){
    console.log(req.body);
    User.findOne({email:req.body.email},function(err,user){
        if(user){
            console.log(`User with same email already exists`);
            return res.status(404).end();
        }
        else if(!user){
            User.create(req.body,function(err){
                if(err){
                    console.log(`Error in adding the user to database`);
                    console.log(err);
                    return res.status(404).end();
                }
                console.log(`User Successfully created`);
                return res.status(200).end();
            })
        }
        else{
            console.log(`Error in finding user`);
            return res.status(404).end();
        }
    })
}