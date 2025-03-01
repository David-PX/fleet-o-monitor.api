const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  console.log("🟢 Socket.io initialized!");

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

const getIo = () => {
  if (!io) {
    console.error("⚠️ Socket.io is not initialized yet!");
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };
