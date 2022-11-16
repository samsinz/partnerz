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



  let userTags;

  if (req.session.currentUser){

    if(req.session.temporaryTags){

      const updatedUser =  await User.findByIdAndUpdate(req.session.currentUser._id, {tags: req.session.temporaryTags}, { new: true })
      req.session.currentUser = updatedUser;

    }
      userTags = req.session.currentUser.tags
  
   
  } else {
    userTags = req.session.temporaryTags
  }

  console.log(userTags)

  // listOfActivities = await Activity.find({tags: userTags[0]});
  let listOfActivitiesDuplicate = [];
  for (let i = 0; i < userTags?.length; i++){
    listOfActivitiesDuplicate = listOfActivitiesDuplicate.concat(await Activity.find({tags: userTags[i]}))

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



  for (let i=0; i< listOfActivitiesObject.length; i++){
    listOfActivities.push(listOfActivitiesObject[i].activity)
    listOfActivities[i].matchPercentage = listOfActivitiesObject[i].num
  }

  // await User.findByIdAndUpdate(req.session.temporaryUser._id, {matchedActivities: listOfActivities})
  req.session.temporaryMatchedActivities = listOfActivities;



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
      scriptName:"activities-details",
    });
  } catch (error) {
    next(error);
  }
});

// ACITIVITIES PARTNERS

router.get("/:activityId/partners", async (req, res) => {

  if (!req.session.currentUser){
    return res.redirect('/auth/signup')
  } 

  const activityId = req.params.activityId

  // const matchedUser = await 

  const allUsers = await User.find({matchedActivities: activityId, _id: {$ne: req.session.currentUser._id}});

  for (let i=0;i<allUsers.length;i++) {
  let birthday = allUsers[i].birthday;
  let date = new Date(birthday);
  let today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  let month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getMonth())) {
    age--;
  }
  allUsers[i].age = age;

  }

  res.render("activities/partners", {allUsers, scriptName: 'partners', styleName:'partners'});



});

// ACTIVITIES PARTNERS DETAILS



router.get("/:activityId/partners/:partnerId", async (req, res) => {
const onePartner = await User.findById(req.params.partnerId);

  let birthday = onePartner.birthday;
  let date = new Date(birthday);
  let today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  let month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getMonth())) {
    age--;
  }
  
  
  res.render(("activities/partner-details") , {
      onePartner,
      age,
      styleName: "partner-details",
      // scriptName:"user-details",
    });
  });
// ACTIVITIES SEND REQUEST

router.get("/:activityId/partners/:partnerId/request", async (req, res) => {
  res.render("activities/send-request");
});

module.exports = router;
