const mongoose = require("mongoose")

const monConn = async () =>{
    try{
    await mongoose.connect(process.env.URI)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = monConn