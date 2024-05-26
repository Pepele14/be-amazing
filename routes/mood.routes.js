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

router.get("/moods", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
