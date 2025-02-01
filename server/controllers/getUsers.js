const userModel = require("../models/userModel");

const getUser =async (req,res) =>{
    try {
        const loggedInUserId = req.body.user.id;
        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
    
        res.status(200).json({success:true,filteredUsers});
      } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({success:false ,message: "Internal server error" });
      }
}

module.exports = {getUser}