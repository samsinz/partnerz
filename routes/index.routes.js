const express = require("express");
const router = express.Router();
const { isExperiencedUser } = require("../middlewares/middlewares");

//HOME

router.get("/", isExperiencedUser, (req, res) => res.render("home", { styleName: "home", scriptName: "home" }));

// INTERESTS
router.get("/interests", (req, res) =>
  res.render("interests", { styleName: "interests", scriptName: "interests" })
);

// PROFILE
router.get("/profile", (req, res) => res.render("profile"));

// ACTIVITIES
router.use("/activities", require("./activities.routes"));

// REQUESTS
router.use("/requests", require("./requests.routes"));

// DISCUSSION
router.use("/discussions", require("./discussions.routes"));

//AUTH
router.use("/auth", require("./auth.routes"));

module.exports = router;
