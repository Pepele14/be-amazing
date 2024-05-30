const { Schema, model } = require("mongoose");

const privateNoteSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const PrivateNote = model("Private-note", privateNoteSchema);

module.exports = PrivateNote;
