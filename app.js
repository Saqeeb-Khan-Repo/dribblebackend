const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000 || process.env.PORT;
const MongoConnect = require("./Database/db");
const router = require("./routes/auth"); // Has /login?
require("dotenv").config();
const homeRoutes = require("./routes/home");
const adminRoutes = require("./routes/admin"); 

const frontend_URI = "https://dribbleclone-1fi7.onrender.com";

//testing route
app.get("/", (req, res) => {
  res.json({ message: "Your backend is live" });
});

// ✅ FIXED CORS for Vite
app.use(
  cors({
    origin: `${frontend_URI}`,
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

// ✅ WAIT FOR DB BEFORE STARTING SERVER
const startServer = async () => {
  try {
    await MongoConnect();
    app.listen(PORT, () => {
      console.log(`✅ Backend is live At ${PORT} | MongoDB Connected`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
