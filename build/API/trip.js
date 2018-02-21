var mongoose = require("mongoose");
var TripSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  start: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    time: {
      month: {
        type: Number,
        required: true
      },
      day: {
        type: Number,
        required: true
      },
      hour: {
        type: Number,
        required: true
      },
      minute: {
        type: Number,
        required: true
      },
      second: {
        type: Number,
        required: true
      }
    }
  },
  end: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    time: {
      month: {
        type: Number,
        required: true
      },
      day: {
        type: Number,
        required: true
      },
      hour: {
        type: Number,
        required: true
      },
      minute: {
        type: Number,
        required: true
      },
      second: {
        type: Number,
        required: true
      }
    }
  },
  distance: {
    type: Number,
    required: true
  }
})

var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
