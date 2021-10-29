const express = require("express");
const { Subscribe } = require("../models/Subscribe");
const router = express.Router();

//======================================
//             Subscribe
//======================================

router.post("/SubscribeNumber", (req, res) => {
  Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscibeNumber: subscribe.length });
  });
});

router.post("/Subscribed", (req, res) => {
  Subscribe.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
    (err, subscribe) => {
      if (err) return res.status(400).send(err);
      let result = false;
      if (subscribe.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, subscribed: result });
    }
  );
});

router.post("/unSubscribe", (req, res) => {
  Subscribe.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/upscuscribe", (req, res) => {
  const subscribe = new Subscribe(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
