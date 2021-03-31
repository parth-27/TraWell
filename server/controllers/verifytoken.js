const jwt = require('jsonwebtoken');

verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(404).json({message:'No Token'});
    }
    jwt.verify(token,'Trawell',(err,decoded)=>{
        if(err){
            return res.status(404).json({message:'Unauthorized'});
        }
        req.userId=decoded.id;
        next();
    })
}

module.exports=verifyToken;