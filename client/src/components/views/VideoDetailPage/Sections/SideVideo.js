import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);
  useEffect(() => {
    Axios.post("/api/video/getSideVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.sideVideo);
        setSideVideos(response.data.sideVideo);
      } else {
        alert("사이드 비디오 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const renderSideVideo = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%", height: "10vh" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`}>
            <span style={{ color: "#000", fontSize: "1rem" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.email}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
          </a>
        </div>
      </div>
    );
  });
  return <div style={{ marginTop: "3rem" }}>{renderSideVideo}</div>;
}

export default SideVideo;
