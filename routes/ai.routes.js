const express = require("express");
const router = express.Router();
const { getAIResponse } = require("../services/aiService");

router.post("/ai-assistant", async (req, res) => {
  try {
    const { query } = req.body;
    const fileName = await getAIResponse(query);
    res.json({ answer: fileName });
  } catch (error) {
    res.status(500).json({ message: "Error getting AI response", error });
  }
});

module.exports = router;
