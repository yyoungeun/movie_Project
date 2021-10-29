const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commmentSchema = mongoose.Schema(
  {
    writer: {
      // 댓글 작성자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      // 게시물 작성자
      type: String,
      ref: "Video",
    },
    responseTo: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commmentSchema);

module.exports = { Comment };
