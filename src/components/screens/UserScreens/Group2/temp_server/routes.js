const express = require("express");
const router = express.Router();
const GraveModel = require("./graveModel");
const PathModal = require("./graveModel");
router.get("/all", async (req, res) => {
  try {
    const graves = await GraveModel.find();
    console.log(graves);
    return res.json(graves);
  } catch (error) {
    console.error("Error fetching graves:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/graves", async (req, res) => {
  const { name, cemetery } = req.query;

  try {
    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (cemetery) {
      query.cemetery = { $regex: new RegExp(cemetery, "i") };
    }

    const graves = await GraveModel.find(query);
    res.json(graves);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/getPaths", async (req, res) => {
  try {
    // Fetch all paths from the database
    const paths = await PathModal.find();

    // Send the paths to the client
    res.status(200).json(paths);
  } catch (error) {
    console.error("Error fetching paths:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/savePath", async (req, res) => {
  const { coordinates, strokeColor } = req.body;

  try {
    // Create a new Path instance and save it to MongoDB
    const newPath = new PathModal({ coordinates, strokeColor });
    await newPath.save();

    res.status(200).send("Path saved successfully!");
  } catch (error) {
    console.error("Error saving path:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
