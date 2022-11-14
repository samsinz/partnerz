const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home"));
router.use("/users", require("./user.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/discussions", require("./discussions.routes"));

module.exports = router;
