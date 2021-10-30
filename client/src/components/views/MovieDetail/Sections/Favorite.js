import React, { useEffect, useState } from "react";
import Axios from "axios";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "antd";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.poster_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    movieId,
    userFrom,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  //현재 좋아요 수 정보
  useEffect(() => {
    //console.log("FavoriteNumber", FavoriteNumber);
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        //console.log(response.data.favoriteNumber);
        setFavoriteNumber(response.data.favoriteNumber);
        //console.log("favoriteNumber", FavoriteNumber);
      } else {
        alert("좋아요 수 정보를 가져오는데 실패했습니다.");
      }
    });

    // 현재 userId로 좋아요 되어있는지 확인
    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        //console.log("favorited", response.data);
        setFavorited(response.data.favorited);
        //console.log("favorited", Favorited);
      } else {
        alert("현재 좋아요 상태를 가져오지 못했습니다.");
      }
    });
  }, []);

  const FavoriteHandler = () => {
    if (Favorited) {
      //좋아요 취소
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
            //console.log("removeFromFavorite", FavoriteNumber);
          } else {
            alert("좋아요 취소 오류입니다.");
          }
        }
      );
    } else {
      //좋아요
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
          //console.log("addToFavorite", FavoriteNumber);
        } else {
          alert("좋아요 실패!");
        }
      });
    }
  };
  return (
    <div>
      <Button
        type="primary"
        ghost
        //style={{ color: "purple" }}
        onClick={FavoriteHandler}
      >
        {Favorited ? (
          <HeartFilled style={{ marginRight: "10px" }} />
        ) : (
          <HeartOutlined style={{ marginRight: "10px" }} />
        )}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
