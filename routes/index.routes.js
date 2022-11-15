const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const { isExperiencedUser } = require("../middlewares/middlewares");

//HOME

router.get("/", isExperiencedUser, (req, res) =>
  res.render("home", { styleName: "home", scriptName: "home" })
);


// INTERESTS
router.get("/interests", (req, res) =>
  res.render("interests", { styleName: "interests", scriptName: "interests" })
);

router.post('/interests', async (req, res) => {
  const {tags} = req.body;
  const temporaryUser = User.create({tags})
  req.locals.temporaryUser = temporaryUser;
  res.redirect('/activities')
})

// PROFILE
router.get("/profile", (req, res) => {
  const bio = req.session.currentUser.bio;

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

  res.render("profile", { age, picture, bio, styleName: "profile" });
});

router.post("/profile", async (req, res) => {
  const { bio } = req.body;
  const id = req.session.currentUser._id;

  const updatedUser = await User.findByIdAndUpdate(id, { bio }, { new: true });
  req.session.currentUser = updatedUser;
  res.redirect("/profile");
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
