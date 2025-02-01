const socketIO = require("socket.io");

const userSocket = {};

const setupSocket = (server) => {
    const io = socketIO(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocket[userId] = socket.id;
            io.emit("getOnlineUsers",  Object.keys(userSocket));
        }
        socket.on("disconnect", () => {
            delete userSocket[userId];
            io.emit("getOnlineUsers", Object.keys(userSocket));
        });
    });

    return { io };
};

const ReceiverSocketID = (receiverId) => {
    return userSocket[receiverId];
};

module.exports = { setupSocket, ReceiverSocketID };