import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Typography, Row } from "antd";
import moment from "moment";

const { Title } = Typography;

function Subscribe() {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    let variable = {
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/video/getSubscribeVideos", variable).then((response) => {
      if (response.data.success) {
        console.log("videos", response.data.videos);
        setVideo(response.data.videos);
      } else {
        alert("구독한 영상 가져오기를 실패했습니다.");
      }
    });
  }, []);
  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
              <br />
              <span>
                {video.writer.firstname} {video.writer.lastname}
              </span>
              <br />
              <span>{moment(video.createdAt).format("MMM Do YY")}</span>
              <span style={{ marginLeft: "3rem" }}>{video.views} views</span>
            </div>
          </a>
        </div>
      </Col>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>구독한 영상</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default Subscribe;
