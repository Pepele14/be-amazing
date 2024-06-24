const { Schema, model } = require("mongoose");

const sentenceSchema = new Schema({
  text: String,
});

const Sentence = model("Sentence", sentenceSchema);

module.exports = Sentence;
