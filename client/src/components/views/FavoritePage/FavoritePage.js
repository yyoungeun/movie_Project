import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./favorite.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  // userId에 대해 좋아요한 영화 목록
  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const fetchFavoritedMovie = () => {
    Axios.post("/api/favorite/favoritedMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        //console.log(response.data.favorites);
        setFavorites(response.data.favorites);
      } else {
        alert("영화 정보 가져오기 실패했습니다.");
      }
    });
  };
  const RemoveHandler = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          // 새로운 결과값 렌더링 (다시 호출)
          fetchFavoritedMovie();
        } else alert("리스트 삭제 실패!");
      }
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
            height="300px"
          />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => RemoveHandler(favorite.movieId, favorite.userFrom)}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>좋아한 영화목록</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorite</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
