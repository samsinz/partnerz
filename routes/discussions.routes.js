const router = require("express").Router();
const User = require("../models/User.model");
const Discussion = require("../models/Discussion.model");
const Message = require("../models/Message.model");
const Match = require("../models/Match.model");

const { isLoggedInFunction } = require("../middlewares/middlewares");

router.get("/", isLoggedInFunction, async (req, res) => {
  const allMatchesId = req.session.currentUser.matches;
  const currentUserConvo = await User.find({
    username: req.session.currentUser.username,
  });


  
  const allMatches = await Match.find({_id: allMatchesId, status:'Pending'})
    .populate({path: 'discussion', populate: {path: 'messages', model: 'Message'}})
    .populate('receiver')
    .populate('sender')

    
    console.log(currentUserConvo);
    
  // const lastMessage = allMatches.discussion.messages[0]
 
    res.render("discussions/discussions", { allMatches, scriptName: 'discussions/discussions', styleName:'discussions/discussions'});
  



    



  
});

router.get("/:id", async (req, res) => {
  const currentConversation = await Discussion.findById(req.params.id).populate(
    "messages"
  );
  const { messages } = currentConversation;
  // console.log(`sending ${messages}`);
  res.render("discussions/single-discussion", {
    messages,
    id: currentConversation._id,
    scriptName: "conversation",
  });
});

router.post("/:id", async (req, res) => {
  // console.log(req.body["new-message-value"]);
  const newMessage = await Message.create({
    sender: req.session.currentUser.username,
    content: req.body["new-message-value"],
  });
  // console.log(newMessage._id);
  // console.log(req.params.id);
  // console.log(
  //   await Discussion.findByIdAndUpdate(req.params.id, {
  //     $push: { messages: newMessage._id },
  //   })
  // );
  res.redirect(req.params.id);
});

module.exports = router;
