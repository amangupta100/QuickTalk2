const mong = require("mongoose")

const conversMod = new mong.Schema({
participants:[
    {
        type:mong.Schema.Types.ObjectId,ref:"user"
    }
],
messages:[
    {
        type:mong.Schema.Types.ObjectId,
        ref:"message",default:[]
    }
]
},{timestamps:true}
)

module.exports = mong.model("conversation",conversMod)