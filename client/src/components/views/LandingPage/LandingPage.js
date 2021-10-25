import React, { useEffect, useState } from "react";
//import { withRouter } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../commons/MainImage";
import { Row } from "antd";
import { DownCircleFilled } from "@ant-design/icons";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [TotalPage, setTotalPage] = useState(0);
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
      <p>영화광고</p>
      {/* movie grid cards */}
      <hr />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>최신영화</h2>
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
