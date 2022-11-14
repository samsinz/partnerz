const { Schema, model } = require("mongoose");

const MatchSchema = {
  sender: {
    type: Schema.Type.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Type.ObjectId,
    ref: "User",
  },
  discussion: {
    type: Schema.Type.ObjectId,
    ref: "Discussion",
  },
  activity: {
    type: Schema.Type.ObjectId,
    ref: "Activity",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
  },
};

module.exports = model("Match", MatchSchema);
