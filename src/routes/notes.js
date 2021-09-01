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
    req.flash("successMsg", "Note Added!");
    res.redirect("/notes");
  }
});

router.get("/notes", async (req, res) => {
  const notesList = await Note.find({}).lean().sort({ date: "desc" });
  res.render("notes/all-notes", { notesList });
});

router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("notes/edit-note", { note });
});

router.put("/notes/edit-note/:id", async (req, res) => {
  const { title, body } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, body });
  req.flash("successMsg", "Your note has been updated!");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", async (req, res) => {
  console.log(req.params.id);
  await Note.findByIdAndDelete(req.params.id);
  req.flash("successMsg", "Note removed!");
  res.redirect("/notes");
});

module.exports = router;
