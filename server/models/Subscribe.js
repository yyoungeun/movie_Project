const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema(
  {
    userTo: {
      //작성자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      //구독자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = { Subscribe };
