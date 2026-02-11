const adminMiddleware = async (req, resizeBy, next) => {
  if (!req.userInfo || req.userInfo.role !== "admin") {
    resizeBy.status(400).json({
      message: "access denied , its only for admin user",
      success: false,
    });
  }
  next();
};

module.exports = adminMiddleware;
