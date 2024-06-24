const express = require("express");
const Sentence = require("../models/Sentences.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/sentence-of-the-day", isAuthenticated, async (req, res) => {
  try {
    const count = await Sentence.countDocuments();
    const random = Math.floor(Math.random() * count);
    const sentence = await Sentence.findOne().skip(random);
    res.json(sentence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
