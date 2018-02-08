var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Clock = mongoose.model("Clock");

app.use(bodyParser.json());

router.post("/", (req,res) => {
  var newClock = new Clock({
    userId: req.body.userId,
    clockType: req.body.clockType,
    month: req.body.month,
    day: req.body.day,
    hours: req.body.hours,
    minutes: req.body.minutes,
    seconds: req.body.seconds,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    altitude: req.body.altitude
  })

  newClock.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.get("/:userId",(req, res) => {
  var userId = req.params["userId"];
  Clock.find({"userId": {$regex: '^' + userId}},function (err, clocks) {
    if (err) {
      res.send(err);
    } else {
      res.send(clocks);
    }
  })
})

module.exports = router;
