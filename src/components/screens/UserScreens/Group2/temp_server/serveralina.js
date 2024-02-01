const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb+srv://group2:group2@lifecloud.cbpgc2a.mongodb.net/LCG2")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a separate schema for coordinates
const coordinateSchema = new mongoose.Schema({
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
const pathSchema = new mongoose.Schema(
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

const Path = mongoose.model("Path", pathSchema);

app.get("/getPaths", async (req, res) => {
  try {
    // Fetch all paths from the database
    const paths = await Path.find();

    // Send the paths to the client
    res.status(200).json(paths);
  } catch (error) {
    console.error("Error fetching paths:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/savePath", async (req, res) => {
  const { coordinates, strokeColor } = req.body;

  try {
    // Create a new Path instance and save it to MongoDB
    const newPath = new Path({ coordinates, strokeColor });
    await newPath.save();

    res.status(200).send("Path saved successfully!");
  } catch (error) {
    console.error("Error saving path:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
