const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Video } = require("../models/Video");

//Storage multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".png") {
      return cb(res.status(400).end("only mp4 or png is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");
//=======================================
//             VideoUploadPage
//=======================================

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

var ffmpeg = require("fluent-ffmpeg");

router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";
  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate" + filenames.join(","));
      console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
      console.log(filePath);
    })
    .on("end", function () {
      console.log("Screenshot taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//=======================================
//             LandingPage
//=======================================

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videos });
    });
});

//=======================================
//             VideoDetailPage
//=======================================

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

//=======================================
//             SideVideo
//=======================================
router.post("/getSideVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, sideVideo) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, sideVideo });
    });
});

module.exports = router;
