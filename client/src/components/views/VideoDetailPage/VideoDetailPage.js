import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import LikeDislikes from "./Sections/LikeDislikes";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [VideoDetailWriter, setVideoDetailWriter] = useState([]);
  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.videoDetail);
        console.log(response.data.videoDetail.writer);
        setVideoDetail(response.data.videoDetail);
        setVideoDetailWriter(response.data.videoDetail.writer);
      } else {
        alert("비디오 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);
  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && <Subscribe />;
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          {/* video rendering */}
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%", height: "70vh", background: "#000" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
            {/* 좋아요 / 싫어요 / 구독 */}
            <List.Item
              actions={[
                <LikeDislikes
                  video
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
                subscribeButton,
              ]}
            >
              {/* 작성자 */}
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    size="large"
                    icon={<UserOutlined />}
                  />
                }
                title={VideoDetailWriter.email}
                description={VideoDetail.description}
              />
            </List.Item>
            {/* 댓글 */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default VideoDetailPage;
