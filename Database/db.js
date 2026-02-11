const mongoose = require("mongoose");

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_DB // Atlas on Render
    : "mongodb+srv://khansaqeeb332_db_user:KrGPyEDLGxJBySSs@cluster1.xnkbbvy.mongodb.net/"; // local dev

const MongoConnect = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is not defined");
    }
    console.log(
      "MONGO_URI starts with:",
      typeof process.env.MONGO_DB === "string"
        ? process.env.MONGO_DB.substring(0, 50) + "..."
        : process.env.MONGO_DB,
    );
    console.log("Full length:", process.env.MONGO_DB?.length || "undefined");

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB FAILED:", err);
    throw err;
  }
};

module.exports = MongoConnect;
