const router = require("express").Router();
const Note = require("../models/NoteModel");

router.get("/notes/new", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, body } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Title is required!" });
  }
  if (!body) {
    errors.push({ text: "Note body is required" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      body,
    });
  } else {
    const NewNote = new Note({ title, body });
    await NewNote.save();
    res.redirect("/notes");
  }
});

router.get("/notes", (req, res) => {
  res.send("Your notes");
});

module.exports = router;
