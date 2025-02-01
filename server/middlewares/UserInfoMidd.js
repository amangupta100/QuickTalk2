const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const UserInfoMidd = async (req,res,next) =>{
const token = req.cookies.token

if(!token) res.json({success:false,message:"Unauthorized user"})
else{
jwt.verify(token,process.env.JWT_secret,async (err,payLoad)=>{
if(err) res.json({success:false,message:"Invalid Token"})
else{
    req.body.user = payLoad
}
})
}
next()
}

module.exports = UserInfoMidd