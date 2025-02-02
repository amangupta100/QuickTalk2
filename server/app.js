const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongConnection = require("./config/monConn")
const authRouter = require("./routes/authRoutes")
const messRouter = require("./routes/messageRoutes")
const userRouter = require("./routes/userRoutes")
const {app,server} = require("./socket")
const userDet = require("./routes/profileDetRoutes")


//config
require("dotenv").config()
mongConnection()

//middlewares
app.use(cors({
    origin: '*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}))
app.use((req, res, next) => {
     res.set({
    'Access-Control-Allow-Origin': process.env.frontend_Url, // Allow specific origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  next();
})
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/message",messRouter)
app.use("/api/users",userRouter)
app.use("/api/userDetails",userDet)

//routes
app.get("/",(req,res)=>{
res.send("Hi")
})

//listen
server.listen(process.env.PORT,()=>{
    console.log("Server is listening at port:"+process.env.PORT)
})
