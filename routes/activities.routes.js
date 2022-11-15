const router = require("express").Router();
const Activity = require("../models/Activity.model");

// ACTIVITIES

router.get("/", async (req, res) => {
  listOfActivities = await Activity.find();
  res.render("activities/activities", { scriptName: "activities", styleName: "activities", activities: listOfActivities });
});

// ACITIVITIES DETAILS

router.get("/:activityId", async (req, res) => {
  res.render("activities/activity-details");
});

// ACITIVITIES PARTNERS

router.get("/:activityId/partners", async (req, res) => {
  res.render("activities/partners");
});

// ACTIVITIES PARTNERS DETAILS

router.get("/:activityId/partners/:partnerId", async (req, res) => {
  res.render("activities/partner-details");
});

// ACTIVITIES SEND REQUEST

router.get("/:activityId/partners/:partnerId/request", async (req, res) => {
  res.render("activities/send-request");
});

module.exports = router;
