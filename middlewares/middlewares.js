function exposeUserToView(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
  }
  next();
}

function isLoggedInFunction(req, res, next) {
  if (req.session.currentUser) {
    return next();
  }
  res.redirect("/auth/signup");
}

function isExperiencedUser(req, res, next) {
  if (req.session.currentUser) {
    if (req.session.currentUser.tags.length != 0) {
      res.redirect("/activities");
    }
  }
  return next();
}

module.exports = {
  isLoggedInFunction,
  exposeUserToView,
  isExperiencedUser,
};
