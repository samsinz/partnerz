const { Schema, model } = require("mongoose");

const MatchSchema = {
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  discussion: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
  },
};

module.exports = model("Match", MatchSchema);
