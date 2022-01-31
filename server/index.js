const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("process.env.NODE_ENV", process.env.NODE_ENV))
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// User
app.use("/api/users", require("./routes/users"));

// Movie favorite
app.use("/api/favorite", require("./routes/favorite"));

// Video
app.use("/api/video", require("./routes/video"));
app.use("/api/like", require("./routes/like"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/comment", require("./routes/comment"));
app.use("/uploads", express.static("uploads"));

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
