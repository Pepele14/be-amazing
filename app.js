require("dotenv").config();
require("./db");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

require("./config")(app);

const authRouter = require("./routes/auth.routes");
const moodRouter = require("./routes/mood.routes");
const notesRouter = require("./routes/notes.routes");

app.use("/auth", authRouter);
app.use("/api", moodRouter);
app.use("/api/distribution", notesRouter);
app.use("/api/notes", notesRouter);

require("./error-handling")(app);

module.exports = app;
