const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB with error handling and reconnection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

// Handle MongoDB connection errors
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting to reconnect...");
  connectDB();
});

module.exports = { connect: connectDB, disconnect: mongoose.disconnect };
