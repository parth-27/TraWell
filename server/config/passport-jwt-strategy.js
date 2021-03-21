const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let options={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'TraWell'
}

passport.use(new JWTStrategy(options,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log(`error in finding user from JWT`);
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
})) 

module.exports=passport;