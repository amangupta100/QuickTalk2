const CreateToken  = require("../libs/CreateToken")
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const maxAge = 3*24*60*60*1000

const SignUp =async (req,res) =>{
const {name,email,username,password} = req.body

try{
const user = await userModel.findOne({username})
if(user) res.json({success:false,message:"Username is already in use"})
else{
    const salt =await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)
    const newUser = await userModel.create({name,email,password:hashedPass,username})
    res.cookie("token",CreateToken(newUser.username,newUser.email,newUser._id,newUser.name),{
        maxAge, secure: true, // Set to true if using HTTPS
    })
    res.json({success:true,message:"User created successfully",user:{
        username:newUser.username,email:newUser.email,id:newUser._id,profileImg:newUser.profileImg
    }})
}

}
catch(err){
    return res.json({success:false,message:err.message})
}
}

const login =async (req,res) =>{
    const {username,password} = req.body
    try{

        const user = await userModel.findOne({username})
        if(user){
           const isValid = await bcrypt.compare(password,user.password)
           if(isValid){
            res.cookie("token",CreateToken(user.username,user.email,user._id,user.name),{
                maxAge, secure: true, // Set to true if using HTTPS
            })
            res.json({success:true,message:"Login Successfully",user:{
                username:user.username,email:user.email,id:user._id,profileImg:user.profileImg
            }})
           }
           else res.json({success:false,message:"Username or password is incorrect"})
        }

        else res.json({success:false,message:"Username or password is incorrect"})
        }
        catch(err){
            return res.json({success:false,message:err.message})
        }
}

const userInfoCont =async (req,res) =>{
const {username} = req.body.user
const user = await userModel.findOne({username})
if(!user) res.json({success:false,message:"Invalid token , login again"})
else{
    res.json({success:true,message:"User find",user:{
        username:user.username,email:user.email,id:user._id,profileImg:user.profileImg,name:user.name
    }})
}
}

const logout = (req,res) =>{
    try {
		res.cookie("token", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully",success:true });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error",success:false });
	}
}

module.exports = {SignUp,login,userInfoCont,logout}