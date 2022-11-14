require("../db");

const mongoose = require("mongoose");
const Message = require("../models/Message.model");
const messages = require("../data/messages.json");

Message.create(messages)
  .then((seededMessages) => {
    console.log(`${seededMessages.length} messages created`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(`Error: ${err}`));
