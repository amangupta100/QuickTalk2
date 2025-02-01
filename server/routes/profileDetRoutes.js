const multer = require("multer")
const userModel = require("../models/userModel")
const cloudinary = require("cloudinary").v2

const router = require("express").Router()

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

cloudinary.config({
    cloud_name:"dbxkt0h5s",
    api_key:295866792124655,
    api_secret:"Bi7etzzMCxWXqb0ZMDE_z4-Z-0U"
})

router.post("/update",upload.single("image"),async (req,res)=>{
    const { userId } = req.body
    if(!req.file) return res.json({success:false,message:"File is required"})
    else{
        if (!userId) {
            return res.status(400).json({success:false,message:"UserId is required"});
          }
          else{
            try{
                // Check if file contains buffer or stream
        if (!req.file.buffer) {
            return res.status(400).json({ success: false, message: "File buffer is missing or invalid" });
        }
                    cloudinary.uploader.upload_stream(
                        { resource_type: "auto" },
                       async (error, result) => {
                            if (error) {
                                return res.status(500).json({ success: false, message: "File upload failed", error: error.message });
                            }
                            const user = await userModel.findOneAndUpdate(
                                { _id: userId },
                                { profileImg: result.secure_url },
                                { new: true, upsert: true }
                              );
                              res.json({success:true,message:"Image uploaded successfully",profUrl:user.profileImg});
                        }
                    ).end(req.file.buffer);
                
            }catch(err){
                res.json({success:false,message:"Internal Server error"+err.message})
            }
            
          }
    }
    })

module.exports = router