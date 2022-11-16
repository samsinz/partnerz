const router = require("express").Router();
const Activity = require("../models/Activity.model");
const User = require("../models/User.model");

function compare(a, b) {
  if (a.num < b.num) {
    return 1;
  }
  if (a.num > b.num) {
    return -1;
  }
  return 0;
}

// ACTIVITIES

router.get("/", async (req, res) => {
  const userTags = req.session.temporaryUser.tags;
  console.log(userTags);

  // listOfActivities = await Activity.find({tags: userTags[0]});
  let listOfActivitiesDuplicate = [];
  for (let i = 0; i < userTags.length; i++) {
    listOfActivitiesDuplicate = listOfActivitiesDuplicate.concat(
      await Activity.find({ tags: userTags[i] })
    );
  }

  const listOfActivitiesObject = [];

  for (let i = 0; i < listOfActivitiesDuplicate.length; i++) {
    const x = listOfActivitiesObject.find(
      (item) => item.activity.name === listOfActivitiesDuplicate[i].name
    );
    if (!x) {
      listOfActivitiesObject.push({
        num: 0,
        activity: listOfActivitiesDuplicate[i],
      });
    } else {
      listOfActivitiesObject[listOfActivitiesObject.indexOf(x)].num++;
    }
  }

  listOfActivitiesObject.sort(compare);

  const listOfActivities = [];

  for (let i = 0; i < listOfActivitiesObject.length; i++) {
    listOfActivities.push(listOfActivitiesObject[i].activity);
  }

  await User.findByIdAndUpdate(req.session.temporaryUser._id, {
    matchedActivities: listOfActivities,
  });

  res.render("activities/activities", {
    scriptName: "activities",
    styleName: "activities",
    activities: listOfActivities,
  });
});

// ACITIVITIES DETAILS

router.get("/:activityId", async (req, res, next) => {
  try {
    const oneActivity = await Activity.findById(req.params.activityId);
    res.render("activities/activity-details", {
      oneActivity,
      styleName: "activity-details",
    });
  } catch (error) {
    next(error);
  }
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
