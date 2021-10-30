const express = require("express");
const { Comment } = require("../models/Comment");
const router = express.Router();

//=================================
//             VideoDetailPage
//=================================

router.post("/getComments", (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

//=========================================
//             Comment, SingleComment
//=========================================

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

module.exports = router;
