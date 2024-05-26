const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
  mood: String,
  date: { type: Date, default: Date.now },
});

const Mood = model("Mood", moodSchema);

module.exports = Mood;
