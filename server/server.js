const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const Category = require("./models/category");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CMS");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

(async () => {
  try {
    await Category.create({ name: "Test Category" });
  } catch (err) {
    console.log(err);
  }
})();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
