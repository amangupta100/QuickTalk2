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


//whitelisted domains
const whiteList = ["http://localhost:5173","https://quick-talk2-client.vercel.app"]
app.use(cookieParser())
app.use(express.json())

//cors setup starts here
const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})
app.use(cors(corsOptions))
//cors setup ends here

//middleware
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
