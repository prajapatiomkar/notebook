const isAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        message: "permission denied. admin access required!",
      });
    }
  } catch (error) {
    next(error);
  }
};
const isUser = (req, res, next) => {
  try {
    if (req.user.role === "user") {
      return next();
    } else {
      return res.status(403).json({
        message: "permission denied. user access required!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export { isAdmin, isUser };
