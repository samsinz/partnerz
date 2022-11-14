require("../db");

const mongoose = require("mongoose");
const User = require("../models/User.model");
const users = require("../data/users.json");

User.create(users)
  .then((seededUsers) => {
    console.log(`${seededUsers.length} users created`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(`Error: ${err}`));
