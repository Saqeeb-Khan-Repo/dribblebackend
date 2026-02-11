const mongoose = require("mongoose");

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URL // Atlas on Render
    : "mongodb+srv://khansaqeeb332_db_user:KrGPyEDLGxJBySSs@cluster1.xnkbbvy.mongodb.net/"; // local dev

const MongoConnect = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is not defined");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB FAILED:", err);
    throw err;
  }
};

module.exports = MongoConnect;
