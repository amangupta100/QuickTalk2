const mongoose = require("mongoose")

const monConn = async () =>{
    try{
    await mongoose.connect(process.env.mongConn_Str)
    }catch(err){
        process.exit(1)
        console.log(err)
    }
}

module.exports = monConn