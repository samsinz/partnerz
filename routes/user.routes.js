const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedInFunction } = require("../middlewares/middlewares");

router.get("/", isLoggedInFunction, async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render("usersList", { users });
});

module.exports = router;
