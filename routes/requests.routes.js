const router = require("express").Router();
const Match = require("../models/Match.model");
const Message = require("../models/Message.model");


// REQUESTS

router.get("/requests-received", async (req, res) => {
  const allMatchesId = req.session.currentUser.matches;
  // const allMatches = await Match.find({_id: allMatchesId, receiver: req.session.currentUser._id, status: 'Pending'}).populate('sender activity discussion', )
  const allMatches = await Match.find({_id: allMatchesId, receiver: req.session.currentUser._id, status: 'Pending'})
    .populate({path: 'discussion', populate: {path: 'messages', model: 'Message'}})
    .populate('activity')
    .populate('receiver')
    .populate('sender')

  

  res.render("requests/requests-received", {scriptName: 'requests/requests-received', styleName: 'requests/requests-received', titleName: 'Hang out requests', allMatches});
});

// REQUESTS

router.get("/requests-received/:id", async (req, res) => {
  res.render("requests/single-request", {scriptName: 'requests/single-request', styleName: 'requests/single-request', titleName: 'Hang out requests'});
});

module.exports = router;
