const jwt = require("jsonwebtoken");


const path = require('path')
                     




exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT);
    req.user = user;
  } else {
    res.status(400).json({ msg: "not authorized" });
  }

  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role != "user") {
    return res.status(400).json({ msg: "must be a user" });
  }
  next()
};

exports.adminMiddle = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(400).json({ msg: "must be an admin" });
  }
  next();
};
