import React, { useEffect, useState } from "react";
//import { withRouter } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../commons/MainImage";
import { Row, Typography, Col } from "antd";
import { DownCircleFilled } from "@ant-design/icons";
import Axios from "axios";
import moment from "moment";

const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [TotalPage, setTotalPage] = useState(0);
  // video 정보
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log("video", response.data);
        setVideo(response.data.videos);
      } else {
        alert("비디오 가져오기 실패ㅠ");
      }
    });
  }, []);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchData(endpoint);
  }, []);

  const fetchData = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
        setTotalPage(response.total_pages);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchData(endpoint);
  };

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
    <div style={{ width: "100%", margin: 0 }}>
      {/* main image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      {/* movie advertising */}
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}>최신 영화광고</Title>
        <hr />
        <Row gutter={[32, 16]}>{renderCards}</Row>
      </div>
      {/* movie grid cards */}
      <hr />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movie List</h2>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      {/* load more */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>
          <DownCircleFilled style={{ fontSize: "16px", marginRight: "10px" }} />
          {CurrentPage}/{TotalPage}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
