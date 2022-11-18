const router = require("express").Router();
const User = require("../models/User.model");
const Discussion = require("../models/Discussion.model");
const Message = require("../models/Message.model");
const Match = require("../models/Match.model");

const { isLoggedInFunction } = require("../middlewares/middlewares");

router.get("/", isLoggedInFunction, async (req, res, next) => {
  const allMatchesId = req.session.currentUser.matches;
  


  
  const allMatches = await Match.find({_id: allMatchesId, status:'Approved'})
    .populate({path: 'discussion', populate: {path: 'messages', model: 'Message'}})
    .populate('receiver')
    .populate('sender')


 

    
  

 for (let i = 0; i < allMatches.length; i++){

  const lastMessage = allMatches[i].discussion.messages.slice(-1)[0].content;
  allMatches[i].lastMessage = lastMessage; 

  const receiver = allMatches[i].receiver;
  const sender = allMatches[i].sender;



  if(String(sender._id) === req.session.currentUser._id){
    allMatches[i].partner = receiver;


  }else {
    allMatches[i].partner = sender;
  }


 }
    
  // const lastMessage = allMatches.discussion.messages[0]
 
    res.render("discussions/discussions", { allMatches, scriptName: 'discussions/discussions', styleName:'discussions/discussions'});
  
});

router.get("/:id", isLoggedInFunction, async (req, res, next) => {

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

router.post("/:id", async (req, res, next) => {
  const newMessage = await Message.create({
    sender: req.session.currentUser,
    content: req.body["new-message-value"],
  });


    await Discussion.findByIdAndUpdate(req.params.id, {
      $push: { messages: newMessage._id },
    })
  

  res.redirect(req.params.id);
});

module.exports = router;
