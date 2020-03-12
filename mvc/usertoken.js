const jwt = require("jsonwebtoken")

module.exports=function (req,res,next)
{

const token =req.header("auth-token");
    if (!token) 
    return res.status(401.1).json({message:"access denied....!!!please provide valid token"})
    try{
        const verified = jwt.verify(token,'securitytoken')
        req.user= verified;
    
       next()

    }catch (err){
    

        res.status(401.1).json({message:'invalid token'})
    }
}

