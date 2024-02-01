require("dotenv").config();


const functions  =require('firebase-functions');
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);
const routes = require("./routes");
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
exports.api = functions.https.onRequest(app);