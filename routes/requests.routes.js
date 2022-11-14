const router = require("express").Router();

// REQUESTS

router.get("/", async (req, res) => {
  res.render("requests/requests-received");
});

// REQUESTS

router.get("/:id", async (req, res) => {
  res.render("requests/single-request");
});

module.exports = router;
