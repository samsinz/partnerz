const { Schema, model } = require("mongoose");

const MessageSchema = {
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
};

module.exports = model("Message", MessageSchema);
