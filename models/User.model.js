const { Schema, model } = require("mongoose");

const UserSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  discussions: [
    {
      discussion: {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
      partner: {
        type: String,
      },
    },
  ],
};

module.exports = model("User", UserSchema);
