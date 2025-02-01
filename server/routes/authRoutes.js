const { login, userInfoCont, SignUp, logout } = require("../controllers/authController")
const UserInfoMidd = require("../middlewares/UserInfoMidd")
const router = require("express").Router()

router.post("/signUp",SignUp)
router.post("/login",login)
router.get("/userInfo",UserInfoMidd,userInfoCont)
router.get("/logout",logout)

module.exports = router