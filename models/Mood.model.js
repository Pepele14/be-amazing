const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
  mood: String,
  date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Mood = model("Mood", moodSchema);

module.exports = Mood;
