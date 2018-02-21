var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Trip = mongoose.model("Trip");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
jwtOptions.secretOrKey = 'LokisBreath-420';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({"_id": jwt_payload.id}, function(err, user) {
    if (err) {
          return next(err, false);
      }
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      }
  });
});

app.use(passport.initialize());
passport.use(strategy);
app.use(bodyParser.json());

router.post("/", (req,res) => {
  var newTrip = new Trip({
    userId: req.body.userId,
    start: {
      latitude: req.body.start.latitude,
      longitude: req.body.start.longitude,
      time: {
        month: req.body.start.time.month,
        day: req.body.start.time.day,
        hours: req.body.start.time.hours,
        minutes: req.body.start.time.minutes,
        seconds: req.body.start.time.seconds
      }
    },
    end: {
      latitude: req.body.end.latitude,
      longitude: req.body.end.longitude,
      time: {
        month: req.body.end.time.month,
        day: req.body.end.time.day,
        hours: req.body.end.time.hours,
        minutes: req.body.end.time.minutes,
        seconds: req.body.end.time.seconds
      }
    },
    distance: req.body.distance
  })

  newTrip.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.get("/:userId", passport.authenticate('jwt', { session: false }),(req, res) => {
  var userId = req.params["userId"];
  Trip.find({"userId": {$regex: '^' + userId}},function (err, trips) {
    if (err) {
      res.send(err);
    } else {
      res.send(trips);
    }
  })
})

module.exports = router;
