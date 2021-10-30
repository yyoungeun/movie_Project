import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import LikeDislikes from "./Sections/LikeDislikes";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    // 비디오 정보
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.videoDetail);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오는데 실패했습니다.");
      }
    });
    // 댓글 정보
    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
        console.log("comments", response.data.comments);
      } else {
        alert("댓글 정보를 조회하지 못했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };
  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );
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
                title={
                  VideoDetail.writer.lastname + VideoDetail.writer.firstname
                }
                description={VideoDetail.description}
              />
            </List.Item>
            {/* 댓글 */}
            <Comment
              commentLists={Comments}
              videoId={videoId}
              refreshFunction={refreshFunction}
            />
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
