const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/notes-db-app")
  .then((db) => console.log("Database connected!"))
  .catch((err) => console.error(err));
