require("../db");

const mongoose = require("mongoose");
const Activity = require("../models/Activity.model");
const activities = require("../data/activities.json");

Activity.create(activities)
  .then((seededActivities) => {
    console.log(`${seededActivities.length} activities created`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(`Error: ${err}`));
