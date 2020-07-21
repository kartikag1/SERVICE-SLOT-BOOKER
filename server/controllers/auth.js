const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

const User = require("../models/user");
//********************************************************************************
exports.signup = (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to register",
      });
    }
    res.json(user);
  });
};

//********************************************************************************
exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER EMAIL DOES NOT EXIST",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "EMAIL AND PASSWORD DOES NOT MATCH",
      });
    }
    const token = jwt.sign({ _id: user._id }, "KARTIK");
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};
//********************************************************************************
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "USER SIGNED OUT SUCCESSFYLLY",
  });
};
//********************************************************************************
//Protected Routes

//Headers-->Authorization:Bearer <auth_token>
exports.isSignedIn = expressJwt({
  secret: "KARTIK",
  userProperty: "auth",
  algorithms: ["sha256"],
});

//Middlewares

// isAuthenticated basically passes to next() when it gets a valid token
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
