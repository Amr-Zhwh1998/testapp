const { Schema, model } = require("mongoose");

const coordinateSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

// Main schema using the coordinates schema
const pathSchema = new Schema(
  {
    coordinates: [coordinateSchema],
    strokeColor: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const PathModal = model("Path", pathSchema);

module.exports = PathModal;
