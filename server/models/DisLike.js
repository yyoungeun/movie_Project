const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: String,
      ref: "Comment",
    },
    videoId: {
      type: String,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const DisLike = mongoose.model("DisLike", dislikeSchema);

module.exports = { DisLike };
