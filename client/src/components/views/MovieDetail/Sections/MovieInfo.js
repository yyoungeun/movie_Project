import React from "react";
import { Descriptions, Badge } from "antd";

function MovieInfo(props) {
  //console.log("props", props);
  let { movie } = props;
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">{movie.title}</Descriptions.Item>
      <Descriptions.Item label="release_date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="vote_average">
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="vote_count">
        {movie.vote_ocunt}
      </Descriptions.Item>
      <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="popularity">
        {movie.popularity}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
