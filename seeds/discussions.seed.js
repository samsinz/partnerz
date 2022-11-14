require("../db");

const mongoose = require("mongoose");
const Discussion = require("../models/Discussion.model");
const discussions = require("../data/discussions.json");

Discussion.create(discussions)
  .then((seededDiscussions) => {
    console.log(`${seededDiscussions.length} discussions created`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(`Error: ${err}`));
