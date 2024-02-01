const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { versionKey: false }
);

const graveSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    cemetery: { type: String, required: true },
    dateOfDeath: { type: Date, required: true },
  },
  { versionKey: false }
);

const GraveModel = model("graves", graveSchema);
module.exports = GraveModel;
