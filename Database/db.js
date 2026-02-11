const mongoose = require("mongoose");

const MongoConnect = async () => {
  try {
    // Production connection options
    const options = {
      maxPoolSize: 10, // Connection pool
      serverSelectionTimeoutMS: 5000, // Fast timeout
      socketTimeoutMS: 45000, // Close slow sockets
      family: 4, // IPv4 only (faster)
    };

    await mongoose.connect(process.env.MONGO_DB, options);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    throw error; // Re-throw so startServer catches it
  }
};

// Auto-reconnect on disconnect (optional)
mongoose.connection.on("disconnected", () => {
  console.log("🔄 MongoDB Disconnected - Reconnecting...");
});

module.exports = MongoConnect;
