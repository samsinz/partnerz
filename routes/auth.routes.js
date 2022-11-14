const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 11;

router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;
  try {
    // check if all sign up fields are filled and if username exists
    if (!username || !name || !password) {
      return res.render("auth/signup", { errorMessage: "All fields are required." });
    }
    if (await User.findOne({ username })) {
      return res.render("auth/signup", { errorMessage: "Username already exists." });
    }

    // hash password and add user to database
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(salt));
    await User.create({ username, name, password: hashedPassword });

    // redirect to home page
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => res.render("auth/login"));

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if all log in fields are filled
    if (!username || !password) {
      return res.render("auth/login", { errorMessage: "All fields are required." });
    }

    // save target user according to username and return error if doesn't exist
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      return res.render("auth/login", { errorMessage: "Username doesn't exist." });
    }

    // hash password and compare with user's
    if (!bcrypt.compareSync(password, targetUser.password)) {
      return res.render("auth/login", { errorMessage: "Wrong password." });
    }

    req.session.currentUser = targetUser;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

router.get("/getuser", (req, res) => {
  console.log(req.session.currentUser);
});

module.exports = router;
