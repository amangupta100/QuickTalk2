const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
            origin: process.env.frontend_Url,
            methods: ["GET", "POST"],
            credentials: true,
        },
});

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports = {getReceiverSocketId,io,server,app}
