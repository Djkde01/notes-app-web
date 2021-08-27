const router = require("express").Router();

router.get("/notes", (req, res) => {
  res.send("Your notes");
});

module.exports = router;
