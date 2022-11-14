const router = require("express").Router();

// ACTIVITIES

router.get("/", async (req, res) => {
  res.render("activities/activities");
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
