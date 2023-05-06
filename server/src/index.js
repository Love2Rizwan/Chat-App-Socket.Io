// Importing required modules
const express = require("express"); // Express.js framework for building web applications
const cors = require("cors"); // CORS middleware for enabling cross-origin resource sharing
const mongoose = require("mongoose"); // Mongoose library for MongoDB interactions
const authRoutes = require("./routes/auth"); // Importing authentication routes
const messageRoutes = require("./routes/messages"); // Importing message routes

// Creating an instance of the Express application
const app = express();

// Importing the socket.io library
const socket = require("socket.io");

// Loading environment variables from .env file
require("dotenv").config();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// route for check Connected to Backend!
app.get("/", (req, res) => {
  res.status(201).json({message: "Connected to Backend!"});
});


// Setting up routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/messages", messageRoutes); // Message routes








// Starting the server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// Setting up socket.io with CORS configuration
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Enable sending cookies
  },
});

// Storing online users in a global variable using a Map
global.onlineUsers = new Map();

// Event listener for a new socket connection
io.on("connection", (socket) => {
  global.chatSocket = socket; // Store the socket instance globally for later use

  // Event listener for "add-user" event
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); // Add the user to the onlineUsers map with their socket ID
  });

  // Event listener for "send-msg" event
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to); // Get the socket ID of the recipient user
    if (sendUserSocket) {
      // If the recipient is online, emit "msg-receive" event to their socket
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
