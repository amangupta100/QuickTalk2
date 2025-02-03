const mongoose = require("mongoose")

const monConn = async () =>{
    try{
    await mongoose.connect(process.env.mongConn_Str)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = monConn