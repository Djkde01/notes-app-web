const router = require("express").Router();

const User = require("../models/UserModel");

router.get("/signin", (req, res) => {
  res.render("users/signin");
});

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({ text: "A name is required" });
  }
  if (password !== confirm_password) {
    errors.push({ text: "Passwords aren't the same!" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const existEmail = await User.findOne({ email: email }).exec();
    console.log(existEmail);
    if (existEmail) {
      req.flash("errorMsg", "Email already registered!");
      res.redirect("/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.hashPassword(password);
      await newUser.save();
      req.flash("successMsg", "Register completed!");
      res.redirect("/signin");
    }
  }
});

module.exports = router;
