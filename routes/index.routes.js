const express = require("express");
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Discussion = require("../models/Discussion.model");
const Message = require("../models/Message.model");

const router = express.Router();
const { isExperiencedUser, isLoggedInFunction } = require("../middlewares/middlewares");
const Uploader = require("./../config/cloudinary.config");

//HOME

router.get("/", isExperiencedUser, (req, res, next) => res.render("home", { styleName: "home", scriptName: "home" }));

// INTERESTS
router.get("/interests", (req, res, next) => res.render("interests", { styleName: "interests", scriptName: "interests" }));

router.post("/interests", async (req, res, next) => {
  try {
    const { tags } = req.body;

    let arrayTags = tags.split(",");
    if (arrayTags.length >= 2) {
      req.session.temporaryTags = arrayTags;

      res.redirect("/auth/signup");
    } else {
    }
  } catch (error) {
    console.log(error);
  }
});

// PROFILE
router.get("/profile", isLoggedInFunction, (req, res, next) => {
  try {
    const bio = req.session.currentUser.bio;
    const tags = req.session.currentUser.tags;

    // POUR AVOIR AGE DES USERS
    let birthday = req.session.currentUser.birthday;
    let date = new Date(birthday);
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    let month = today.getMonth() - date.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < date.getMonth())) {
      age--;
    }

    let picture = req.session.currentUser.profilePicture;

    res.render("profile", {
      age,
      picture,
      bio,
      tags,
      styleName: "profile",
      scriptName: "profile",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/profile", Uploader.single("profilePicture"), async (req, res, next) => {
  const { bio } = req.body;
  try {
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    const id = req.session.currentUser._id;
    const updatedUser = await User.findByIdAndUpdate(id, { profilePicture, bio }, { new: true });
    //const updatedUser = await User.findByIdAndUpdate(id, { bio }, { new: true });

    req.session.currentUser = updatedUser;

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile/delete/:id", async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    await Match.remove({sender: req.params.id})
    await Match.remove({receiver: req.params.id})
    await Discussion.remove({users: req.params.id})
    await Message.remove({sender: req.params.id})

    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// ACTIVITIES
router.use("/activities", require("./activities.routes"));

// REQUESTS
router.use("/requests", require("./requests.routes"));

// DISCUSSION
router.use("/discussions", require("./discussions.routes"));

//AUTH
router.use("/auth", require("./auth.routes"));

module.exports = router;
