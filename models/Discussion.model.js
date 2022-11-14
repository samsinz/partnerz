const { Schema, model } = require("mongoose");

const DiscussionSchema = {
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
};

module.exports = model("Discussion", DiscussionSchema);
