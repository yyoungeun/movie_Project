const express = require("express");
const { DisLike } = require("../models/DisLike");
const { Like } = require("../models/Like");
const router = express.Router();

//======================================
//             LikeDislikes
//======================================

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getDisLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  DisLike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(variable);
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
  });

  // Dislike 이미 클릭되어 있는 경우 Dislike -1
  DisLike.findOneAndDelete(variable).exec((err, disLikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/unLike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const dislike = new DisLike(variable);

  dislike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
  });

  // 좋아요 되어있는 경우 unlike 변경
  Like.findOneAndDelete(variable).exec((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/unDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  DisLike.findOneAndDelete(variable).exec((err, dislikeresult) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
