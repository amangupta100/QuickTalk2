const {sendMessage, getMessages} = require("../controllers/messageCont")
const UserInfoMidd = require("../middlewares/UserInfoMidd")
const router = require("express").Router()

router.post("/send/:id",UserInfoMidd,sendMessage)
router.get("/getMessages/:id",UserInfoMidd,getMessages)

module.exports = router