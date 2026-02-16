// Database/db.js
const mongoose = require("mongoose");

let cachedConnection = null;

const MongoConnect = async () => {
  if (cachedConnection) return cachedConnection;

  const uri = process.env.MONGO_URI; 

  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    // console.log("MONGO_URI starts with:", uri.substring(0, 50) + "...");
    // console.log("Full length:", uri.length);

    const conn = await mongoose.connect(uri);
    cachedConnection = conn;
    console.log("MongoDB connected");
    return conn;
  } catch (err) {
    console.error("MongoDB FAILED:", err);
    cachedConnection = null;
    throw err;
  }
};

module.exports = MongoConnect;
