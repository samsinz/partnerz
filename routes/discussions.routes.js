const router = require("express").Router();
const User = require("../models/User.model");
const Discussion = require("../models/Discussion.model");
const Message = require("../models/Message.model");

const { isLoggedInFunction } = require("../middlewares/middlewares");

router.get("/", isLoggedInFunction, async (req, res) => {
  const currentUserConvo = await User.findOne({
    username: req.session.currentUser.username,
  });
  console.log(currentUserConvo.discussions);
  res.render("discussions/discussions", { currentUserConvo });
});

router.get("/:id", async (req, res) => {
  const currentConversation = await Discussion.findById(req.params.id)
      .populate({path: 'messages', populate: {path: 'sender', model: 'User'}})
      .populate('users');
  // const { messages } = currentConversation;

  let partner;
  for(let i=0; i < currentConversation.users.length; i++){
    if(currentConversation.users[i]._id != req.session.currentUser._id){
      partner = currentConversation.users[i]
    }
  }

  res.render("discussions/single-discussion", {
    currentConversation,
    partner,
    id: currentConversation._id,
    scriptName: "discussions/single-discussion",
    styleName: "discussions/single-discussion"
  });
});

router.post("/:id", async (req, res) => {
  console.log(req.body["new-message-value"]);
  const newMessage = await Message.create({
    sender: req.session.currentUser,
    content: req.body["new-message-value"],
  });
  console.log(newMessage._id);
  console.log(req.params.id);
  console.log(
    await Discussion.findByIdAndUpdate(req.params.id, {
      $push: { messages: newMessage._id },
    })
  );
  res.redirect(req.params.id);
});

module.exports = router;
