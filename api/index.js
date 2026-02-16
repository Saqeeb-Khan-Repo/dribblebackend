// api/index.js
const express = require("express");
const cors = require("cors");
const MongoConnect = require("../Database/db");
const router = require("../routes/auth");
const homeRoutes = require("../routes/home");
const adminRoutes = require("../routes/admin");
require("dotenv").config();

const app = express();

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === "https://dribbleclone-1fi7.onrender.com" ||
        origin === "http://localhost:5175" // note: just origin, no hash/path
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Your backend is live on Vercel" });
});

// Routes (unique prefixes)
app.use("/api", router); // e.g. POST /api/auth/login
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

// connect DB once per cold start
let dbPromise = null;
const ensureDB = async () => {
  if (!dbPromise) {
    dbPromise = MongoConnect()
      .then(() => console.log("MongoDB connected (Vercel)"))
      .catch((err) => {
        console.error("MongoDB connection error", err);
        dbPromise = null;
        throw err;
      });
  }
  return dbPromise;
};

// ensure we initialize DB on first request
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// IMPORTANT: no app.listen – export app instead
module.exports = app;
