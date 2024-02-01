const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://group2:group2@lifecloud.cbpgc2a.mongodb.net/LCG2")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define location schema
const locationSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { versionKey: false }
);

// Create Graves model using locationSchema
const gravesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    cemetery: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Grave = mongoose.model("graves", gravesSchema);

// API endpoint to search for graves by name or cemetery
app.get("/api/graves", async (req, res) => {
  const { name, cemetery } = req.query;

  try {
    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (cemetery) {
      query.cemetery = { $regex: new RegExp(cemetery, "i") };
    }

    const graves = await Grave.find(query);
    res.json(graves);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running at http://127.0.0.1:${port}`);
});
