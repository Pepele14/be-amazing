const express = require("express");
const Mood = require("../models/Mood.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/moods", isAuthenticated, async (req, res) => {
  console.log("Received POST request for /moods");

  try {
    const { mood } = req.body;
    const userId = req.payload._id;
    console.log("User ID:", userId, "Mood:", mood);

    const newMood = new Mood({ mood, userId });
    const savedMood = await newMood.save();
    res.json(savedMood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get overall mood distribution
router.get("/distribution", isAuthenticated, async (req, res) => {
  console.log("Received GET request for /distribution");
  console.log("Payload:", req.payload);
  const userId = req.payload._id;
  console.log("User ID:", userId);
  try {
    const moods = await Mood.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("Aggregated mood data:", moods);
    res.json(moods);
  } catch (err) {
    console.error("Aggregation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get weekly mood distribution
router.get("/weekly-distribution", isAuthenticated, async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const userId = req.payload._id;
    const weeklyMoods = await Mood.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(weeklyMoods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get the latest mood for each user
router.get("/latest", isAuthenticated, async (req, res) => {
  console.log("Fetching the latest mood for the user");

  try {
    const userId = req.payload._id;
    const latestMood = await Mood.findOne({ userId }).sort({ date: -1 });

    if (!latestMood) {
      return res.status(404).json({ msg: "No mood entries found" });
    }

    res.json({ mood: latestMood.mood });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
