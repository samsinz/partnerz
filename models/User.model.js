const { Schema, model } = require("mongoose");

const UserSchema = {
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  birthday: {
    type: Date,
  },

  bio: String,
  profilePicture: String,

  tags: {
    type: [String],
    enum: [
      "Museum",
      "Indoors",
      "Outdoors",
      "Bar",
      "Fancy",
      "Adventure",
      "Culture",
      "Art",
      "Show",
      "Romantic",
      "Landscape",
      "Secret Place",
      "Free",
      "Cheap",
      "Cocktails",
      "Music",
      "Cosy",
      "Ambiance",
      "Exotic",
      "Original",
      "Chill",
      "Sports",
      "Creative",
      "Touristic",
      "Food",
      "Walks",
      "Drinks",
      "Open Minded",
      "Craft",
      "Clubbing",
    ],
  },

  matchedActivities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],

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
