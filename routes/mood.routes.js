const express = require("express");
const Mood = require("../models/Mood.model");

const router = express.Router();

router.post("/moods", async (req, res) => {
  try {
    const mood = new Mood({ mood: req.body.mood });
    const savedMood = await mood.save();
    res.json(savedMood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get overall mood distribution
router.get("/distribution", async (req, res) => {
  try {
    const moods = await Mood.aggregate([
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get weekly mood distribution
router.get("/weekly-distribution", async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const weeklyMoods = await Mood.aggregate([
      {
        $match: {
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

module.exports = router;
