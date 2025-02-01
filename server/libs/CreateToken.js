const jwt = require("jsonwebtoken")

const CreateToken = (username,email,id) =>{
return jwt.sign({username,email,id},process.env.JWT_secret,{
    expiresIn:"3d"
})
}

module.exports = CreateToken