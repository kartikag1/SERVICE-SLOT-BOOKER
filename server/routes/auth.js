const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { signout, signin, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is mandatory").isEmail(),
    check("password", "password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);
//*********************************************************************************************
router.post(
  "/signin",
  [
    check("email", "Either email is missing or incorrect").isEmail(),
    check("password", "password is mandatory").isLength({
      min: 1,
    }),
  ],
  signin
);
//*********************************************************************************************
router.get("/signout", signout);

module.exports = router;
