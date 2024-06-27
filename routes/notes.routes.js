const express = require("express");
const PrivateNote = require("../models/PrivateNote.model");
const PublicNote = require("../models/PublicNote.model");
const Like = require("../models/Like.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
console.log("Notes router loaded");

// Route to save a private note
router.post("/private", isAuthenticated, async (req, res) => {
  try {
    const { content, tags } = req.body;
    const userId = req.payload._id; // Get userId from payload
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const note = new PrivateNote({ content, userId, tags });
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
    const { content, tags } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const note = new PublicNote({ content, tags });
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
    const { page = 1, limit = 8 } = req.query; //In order to add pagination
    console.log(`Fetching public notes - Page: ${page}, Limit: ${limit}`);
    const publicNotes = await PublicNote.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const notesWithLikes = await Promise.all(
      publicNotes.map(async (note) => {
        const likeCount = await Like.countDocuments({ noteId: note._id });
        return { ...note.toObject(), likeCount };
      })
    );

    console.log(`Returning ${notesWithLikes.length} notes`);
    res.json(notesWithLikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single public note
router.get("/public/:noteId", async (req, res) => {
  try {
    const note = await PublicNote.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get comments for a specific note
router.get("/public/:noteId/comments", async (req, res) => {
  try {
    const { noteId } = req.params;
    const comments = await Comment.find({ noteId }).populate(
      "userId",
      "username"
    );
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to add a comment to a specific note
router.post("/public/:noteId/comments", isAuthenticated, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content } = req.body;
    const userId = req.payload._id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Comment({ noteId, userId, content });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to like/unlike a note
router.post("/public/:noteId/like", isAuthenticated, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.payload._id;

    const existingLike = await Like.findOne({ userId, noteId });

    if (existingLike) {
      // Unlike the note
      await Like.deleteOne({ userId, noteId });
      const likeCount = await Like.countDocuments({ noteId });
      res.status(200).json({ message: "Like removed" });
    } else {
      // Like the note
      const like = new Like({ userId, noteId });
      await like.save();
      const likeCount = await Like.countDocuments({ noteId });
      res.status(201).json({ message: "Like added" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get likes for a user
router.get("/public/likes", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const likes = await Like.find({ userId });
    res.json(likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get all private notes
router.get("/private", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const notes = await PrivateNote.find({ userId });
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
