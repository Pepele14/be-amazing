require("dotenv").config();
require("./db");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

require("./config")(app);

//import routers
const authRouter = require("./routes/auth.routes");
const moodRouter = require("./routes/mood.routes");
const notesRouter = require("./routes/notes.routes");

//use routers
app.use("/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/moods", moodRouter);

require("./error-handling")(app);

module.exports = app;
