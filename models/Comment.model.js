const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    noteId: { type: Schema.Types.ObjectId, ref: "PublicNote", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
