const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const MongoConnect = require("./Database/db");
const router = require("./routes/auth"); // Has /login?
require("dotenv").config();
const homeRoutes = require("./routes/home");
const adminRoutes = require("./routes/admin");

// ✅ FIXED CORS for Vite
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Routes (unique prefixes)
app.use("/api", router); // POST /api/auth/login
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

const startServer = async () => {
  try {
    await MongoConnect();
    app.listen(PORT, () => console.log(`✅ Backend: http://localhost:${PORT}`));
  } catch (error) {
    console.error("💥 Failed:", error);
    process.exit(1);
  }
};
startServer();
