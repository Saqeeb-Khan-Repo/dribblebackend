const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(400).json({
      message: "Acceses denied . please login to continue",
      success: false,
    });
  }

  //decode the token
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    console.log(decodeToken);

    req.userInfo = decodeToken;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Acceses denied . please login to continue",
      success: false,
      data: error,
    });
  }
};

module.exports = authMiddleware;
