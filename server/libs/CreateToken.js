const jwt = require("jsonwebtoken")

const CreateToken = (username,email,id,name) =>{
return jwt.sign({username,email,id,name},process.env.JWT_secret,{
    expiresIn:"3d"
})
}

module.exports = CreateToken