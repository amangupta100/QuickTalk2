const { getUser } = require("../controllers/getUsers")
const UserInfoMidd = require("../middlewares/UserInfoMidd")

const router = require("express").Router()

router.get("/",UserInfoMidd,getUser)

module.exports = router