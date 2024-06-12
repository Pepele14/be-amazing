const mongoose = require("mongoose");
const Mood = require("../models/Mood.model");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/amazing-project-users";

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log(
      "Connected to Mongo! Database name:",
      mongoose.connection.db.databaseName
    );
    try {
      // Replace with the user ID to test
      const userId = new mongoose.Types.ObjectId("6666c9fa0199bc90c5056ee2");

      const moods = await Mood.aggregate([
        { $match: { userId: userId } },
        {
          $group: {
            _id: "$mood",
            count: { $sum: 1 },
          },
        },
      ]);

      console.log("Aggregated mood data:", moods);
    } catch (err) {
      console.error("Aggregation error:", err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
