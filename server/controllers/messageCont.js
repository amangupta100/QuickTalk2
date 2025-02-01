const conversationModel = require("../models/conversationModel")
const messageModel = require("../models/messageModel")
const { getReceiverSocketId, io } = require("../socket")

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.body.user.id
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessages = new messageModel({
            senderId, receiverId, message
        })
        if (newMessages) {
            conversation.messages.push(newMessages._id)
        }
        await Promise.all([conversation.save(), newMessages.save()])

        // Check if the receiver is connected
        const ReceiverID = getReceiverSocketId(receiverId)
        if (ReceiverID) {
            // Emit the message to the receiver
            io.to(ReceiverID).emit("newMessage", newMessages);
        } else {
            console.log("Receiver is not connected.");
        }
        
        res.json({ success: true, message: "Message sent successfully", newMessages })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderID = req.body.user.id
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderID, userToChatId] }
        }).populate("messages")
        if (!conversation) res.json({ success: true, messages: [] })
        else {
            res.json({ success: true, messages: conversation.messages })
        }

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}

module.exports = { sendMessage, getMessages }
