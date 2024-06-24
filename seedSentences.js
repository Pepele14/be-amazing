require("dotenv").config();
require("./db");

const Sentence = require("./models/Sentence.model");

const sentences = [
  " The mind is a powerful force; use it wisely.",
  " Self-awareness is the first step to personal growth.",
  " Emotions are neither good nor bad; they simply are. ",
  " Our thoughts shape our reality.",
  " Empathy bridges the gap between self and others.",
];

const seedSentences = async () => {
  try {
    // await Sentence.deleteMany(); // clear the collection if needed
    await Sentence.insertMany(sentences.map((text) => ({ text })));
    console.log("Sentences have been added");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSentences();
