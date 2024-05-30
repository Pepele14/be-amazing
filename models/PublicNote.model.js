const { Schema, model } = require("mongoose");

const publicNoteSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const PublicNote = model("Public-note", publicNoteSchema);

module.exports = PublicNote;
