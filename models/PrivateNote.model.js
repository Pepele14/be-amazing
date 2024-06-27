const { Schema, model } = require("mongoose");

const privateNoteSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
});

const PrivateNote = model("Private-note", privateNoteSchema);

module.exports = PrivateNote;
