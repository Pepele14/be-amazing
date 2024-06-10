const express = require("express");
const PrivateNote = require("../models/PrivateNote.model");
const PublicNote = require("../models/PublicNote.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
console.log("Notes router loaded");

// Route to save a private note
router.post("/private", isAuthenticated, async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.payload._id; // Get userId from payload
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const note = new PrivateNote({ content, userId });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to save a public note
router.post("/public", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const note = new PublicNote({ content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get all public notes
router.get("/public", async (req, res) => {
  try {
    const publicNotes = await PublicNote.find();
    res.json(publicNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get all private notes
router.get("/private", isAuthenticated, async (req, res) => {
  try {
    const notes = await PrivateNote.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/api/notes", async (req, res) => {
  const { transcripts } = req.body;
  try {
    const newNote = new Note({
      transcripts,
    });
    await newNote.save();
    res.status(201).send(newNote);
  } catch (error) {
    res.status(400).send({ error: "Error saving note" });
  }
});

module.exports = router;
