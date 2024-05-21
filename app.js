// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const logger = require("morgan");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
//THESE FIRST 2 ROUTES WILL HAVE TO BE ADJUSTED ACCORDING TO MY PROJECT
// const dashboardRouter = require("./routes/project.routes");
// app.use("/api", isAuthenticated, projectRouter);

// const taskRouter = require("./routes/task.routes");
// app.use("/api", isAuthenticated, taskRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
