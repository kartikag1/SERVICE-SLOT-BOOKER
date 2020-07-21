const express = require("express");
const booking = require("../models/booking");

exports.makeABooking = (req, res) => {
  booking.create(req.body, (errr, docss) => {
    if (errr) {
      return res.json({ err: "some error" });
    }
    return res.json(docss);
  });
};

exports.checkBooked = (req, res, next) => {
  booking.find(
    {
      date: req.body.date,
      timeFrom: { $gte: req.body.timeFrom },
      timeTo: { $lte: req.body.timeTo },
    },
    (err, docs) => {
      if (err) {
        return res.json({ err: "some error" });
      } else if (!docs.length) {
        next();
      } else {
        return res.json({ err: "slot not empty" });
      }
    }
  );
};

exports.getBookings = (req, res) => {
  booking.find(req.body, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.json(doc);
    }
  });
};
