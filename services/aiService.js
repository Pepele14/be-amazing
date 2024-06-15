const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require("path");
const punycode = require("punycode");

const client = new textToSpeech.TextToSpeechClient();

const getAIResponse = async (query) => {
  // Mock AI response logic, replace with your actual AI response logic
  const aiResponse = `AI Response to: "${query}"`;

  // Synthesize speech using Google Cloud Text-to-Speech
  const request = {
    input: { text: aiResponse },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  // Save the synthesized speech to an MP3 file
  const fileName = `output-${Date.now()}.mp3`;
  const filePath = path.join(__dirname, `../public/${fileName}`);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filePath, response.audioContent, "binary");
  return fileName;
};

module.exports = {
  getAIResponse,
};
