const express = require("express");
const { registerAuth, loginAuth } = require("../controllers/auth-controllers");
const router = express.Router();

//routes

router.post("/register", registerAuth);
router.post("/login", loginAuth);

module.exports = router;
