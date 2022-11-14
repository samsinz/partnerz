const { Schema, model } = require("mongoose");

const DiscussionSchema = {
  user1: String,
  user2: String,
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
};

module.exports = model("Discussion", DiscussionSchema);
