const router = require("express").Router();

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

// router.get("/user/:userId", getUser);

module.exports = router;
