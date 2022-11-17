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
  const singleRequest = await Match.findById(req.params.id)
    .populate({path: 'discussion', populate: {path: 'messages', model: 'Message'}})
    .populate('activity')
    .populate('receiver')
    .populate('sender')

  let birthday = singleRequest.sender.birthday;
  let date = new Date(birthday);
  let today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  let month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getMonth())) {
    age--;
  }

  res.render("requests/single-request", { singleRequest , age, scriptName: 'requests/single-request', styleName: 'requests/single-request', titleName: 'Hang out requests'});
});


module.exports = router;
