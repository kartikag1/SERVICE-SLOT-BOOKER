var mongoose = require("mongoose");

var bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    facility: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeFrom: {
      type: Number,
      required: true,
    },
    timeTo: {
      type: Number,
      required: true,
    },
    err: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
bookingSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Bookings", bookingSchema);
