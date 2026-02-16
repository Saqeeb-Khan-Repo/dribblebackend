const express = require("express");
const cors = require("cors");
const MongoConnect = require("../Database/db");
const router = require("../routes/auth");
const homeRoutes = require("../routes/home");
const adminRoutes = require("../routes/admin");
require("dotenv").config();

const app = express();

// CORS: allow all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// connect DB once per cold start, before any route handler
let dbPromise = null;
const ensureDB = async () => {
  if (!dbPromise) {
    dbPromise = MongoConnect();
  }
  return dbPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    console.error("DB ensure error:", err);
    res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
});

// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend on Vercel is running" });
});

// routes
app.use("/api", router);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
