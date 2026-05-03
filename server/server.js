require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Socket.IO Events
const userSockets = {}; // Map to store user id and their socket id

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // User joins
  socket.on("user-join", (userId) => {
    userSockets[userId] = socket.id;
    socket.join(userId);
    io.emit("user-status", { userId, status: "online" });
  });

  // User joins conversation
  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // Receive message
  socket.on("send-message", (data) => {
    io.to(data.conversationId).emit("receive-message", data);
  });

  // Typing indicator
  socket.on("typing", (data) => {
    io.to(data.conversationId).emit("user-typing", {
      conversationId: data.conversationId,
      senderId: data.senderId,
      username: data.username,
    });
  });

  // Stop typing
  socket.on("stop-typing", (data) => {
    io.to(data.conversationId).emit("user-stop-typing", {
      senderId: data.senderId,
    });
  });

  // User disconnects
  socket.on("disconnect", () => {
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        io.emit("user-status", { userId, status: "offline" });
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });

  // Message read
  socket.on("message-read", (data) => {
    io.to(data.conversationId).emit("message-read-receipt", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
