function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log(req.isAuthenticated());
    res.send("not authorized!");
  }
}

export default isAuthenticated;
