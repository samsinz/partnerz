const express = require("express");
const router = express.Router();

//HOME
router.get("/", (req, res) => res.render("home"));

// INTERESTS
router.get("/interests", (req, res) => res.render("interests"));

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
