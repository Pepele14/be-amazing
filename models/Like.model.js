const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  noteId: { type: Schema.Types.ObjectId, required: true },
});

const Like = model("Like", likeSchema);

module.exports = Like;
