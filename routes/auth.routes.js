const fileUploader = require("../config/cloudinary.config");
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 11;

const { exposeUserToView, isLoggedInFunctionSignUp, hasTemporaryTags } = require("../middlewares/middlewares");

router.get("/signup", isLoggedInFunctionSignUp, hasTemporaryTags, (req, res) => res.render("auth/signup", {styleName: 'signup', scriptName: 'signup'}));

router.post("/signup", fileUploader.single("profilePicture"), async (req, res) => {
  const { name, birthday, email, password } = req.body;

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  try {
    if (!name || !birthday || !email || !password || !req.file) {
      return res.render("auth/signup", {
        errorMessage: "All fields are required.", styleName: 'signup', scriptName: 'signup'
      });
    }
    if (!regex.test(password)) {
      return res.status(500).render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",styleName: 'signup', scriptName: 'signup'
      });
    }

    if (await User.findOne({ email })) {
      return res.render("auth/signup", {
        errorMessage: "Email already exists.",styleName: 'signup', scriptName: 'signup'
      });
    }

    // hash password and add user to database
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(salt));
    await User.create({
      name,
      birthday,
      email,
      password: hashedPassword,
      profilePicture: req.file.path,
      matchedActivities: req.session.temporaryMatchedActivities,
      tags: req.session.temporaryTags
    });

    const targetUser = await User.findOne({ email });
    req.session.currentUser = targetUser;

    // redirect to home page
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => res.render("auth/login", {scriptName: 'login', styleName: 'login'}));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if all log in fields are filled
    if (!email || !password) {
      return res.render("auth/login", {
        errorMessage: "All fields are required.",scriptName: 'login', styleName: 'login'
      });
    }

    // save target user according to username and return error if doesn't exist
    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      return res.render("auth/login", {
        errorMessage: "Email doesn't exist.",scriptName: 'login', styleName: 'login'
      });
    }

    // hash password and compare with user's
    if (!bcrypt.compareSync(password, targetUser.password)) {
      return res.render("auth/login", { errorMessage: "Wrong password.", scriptName: 'login', styleName: 'login'});
    }

    req.session.currentUser = targetUser;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.locals.isLoggedIn = false;
  res.redirect("/");
});

router.get("/getuser", (req, res) => {
  console.log(req.session.currentUser);
});

module.exports = router;
