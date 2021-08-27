const router = require("express").Router();

router.get("/signin", (req, res) => {
  res.send("Page to sign in");
});

router.get("/signup", (req, res) => {
  res.send("You can enter to the app here");
});

module.exports = router;
