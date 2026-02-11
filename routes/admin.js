const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const adminRoutes = express.Router();

//routes
adminRoutes.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "welcome to Admin page",
  });
});

module.exports = adminRoutes;
