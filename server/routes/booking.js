const router = require("express").Router();

const {
  makeABooking,
  checkBooked,
  getBookings,
} = require("../controllers/booking");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.post("/book", checkBooked, makeABooking);
router.post("/bookings", getBookings);

module.exports = router;
