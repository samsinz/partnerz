const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const { isExperiencedUser } = require("../middlewares/middlewares");
const Uploader = require("./../config/cloudinary.config");

//HOME

router.get("/", isExperiencedUser, (req, res) =>
  res.render("home", { styleName: "home", scriptName: "home" })
);


// INTERESTS
router.get("/interests", (req, res) =>
  res.render("interests", { styleName: "interests", scriptName: "interests" })
);

router.post('/interests', async (req, res) => {
  const {tags} = req.body
  let arrayTags = tags.split(",")
  const email = Math.floor(Math.random() * 2000) + '@' + Math.floor(Math.random() * 2000) + '.' + Math.floor(Math.random() * 2000)
  const temporaryUser = await User.create({tags: arrayTags, email})
  res.locals.temporaryUser = temporaryUser;
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

  res.render("profile", {
    age,
    picture,
    bio,
    styleName: "profile",
    scriptName: "profile",
  });
});

router.post("/profile", Uploader.single("profilePicture"), async (req, res) => {
  const { bio } = req.body;
  let profilePicture;
  console.log(req.file);
  if (req.file) {
    profilePicture = req.file.path;
  }
  const id = req.session.currentUser._id;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { profilePicture, bio },
    { new: true }
  );
  console.log(updatedUser);
  //const updatedUser = await User.findByIdAndUpdate(id, { bio }, { new: true });

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
