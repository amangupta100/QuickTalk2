const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{
        type:String,required:true
    },
    username:{
        type:String,required: true,unique:true
    },
    email:{
        type:String,unique:true,required: true,
    },
    password:{
        type:String,required: true,
    },
    profileImg:{
        type:String,default:""
    }
},{
    timestamps:true,minimize:false
})

module.exports = mongoose.model("user",userModel)