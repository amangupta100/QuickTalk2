const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongConnection = require("./config/monConn")
const authRouter = require("./routes/authRoutes")
const messRouter = require("./routes/messageRoutes")
const userRouter = require("./routes/userRoutes")
const {app,server} = require("./socket")


//config
require("dotenv").config()
mongConnection()

//middlewares
app.use(cors({
    origin:process.env.frontend_Url,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/message",messRouter)
app.use("/api/users",userRouter)

//routes
app.get("/",(req,res)=>{
res.send("Hi")
})

//listen
server.listen(process.env.PORT,()=>{
    console.log("Server is listening at port:"+process.env.PORT)
})