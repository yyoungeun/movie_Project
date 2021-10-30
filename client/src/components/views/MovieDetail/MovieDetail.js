import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ToggleActor, setToggleActor] = useState(false);

  useEffect(() => {
    //console.log("props.match", props);
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    let endpointcast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        //console.log("endpointInfo", response);
        setMovie(response);
      });

    fetch(endpointcast)
      .then((response) => response.json())
      .then((response) => {
        //console.log("endpointcast", response);
        setCasts(response.cast);
      });
  }, []);

  const toggleActor = () => {
    setToggleActor(!ToggleActor);
  };
  return (
    <div>
      {/* MainImage */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.title}
        text={Movie.overview}
      />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* favorite */}
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
        {/* MovieInfo */}
        <MovieInfo movie={Movie} />

        {/* Actor Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button type="primary" ghost onClick={toggleActor}>
            <Avatar
              size={25}
              style={{ backgroundColor: "#1890ff", marginRight: "10px" }}
              icon={<UserOutlined />}
            />
            character
          </Button>
        </div>
        {ToggleActor && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    character={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
