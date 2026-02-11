const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const homeRoutes = express.Router();

//routes
homeRoutes.get("/home", authMiddleware, (req, res) => {
  res.json({
    message: "welcome to home page",
  });
});

module.exports = homeRoutes;
