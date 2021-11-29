import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { userId: props.userId, commentId: props.commentId };
  }

  useEffect(() => {
    // 현재 좋아요 수
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //console.log("getlikes", response.data.likes.length);
        setLikes(response.data.likes.length);

        // 이미 좋아요 눌렀는지? (현재 id기준)
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("좋아요 수를 가져오지 못했습니다.");
      }
    });

    // 현재 싫어요 수
    Axios.post("/api/like/getDisLikes", variable).then((response) => {
      if (response.data.success) {
        //console.log("getdislikes", response.data.dislikes.length);
        setDislikes(response.data.dislikes.length);
        // 이미 싫어요 눌렀는지? (현재 id기준)
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDisLikeAction("disliked");
          }
        });
      } else {
        alert("좋아요 수를 가져오지 못했습니다.");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      // Like add
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          if (DisLikeAction !== null) {
            setDisLikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("좋아요 +1 실패..");
        }
      });
    } else {
      // Like minus
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("좋아요 취소 실패..");
        }
      });
    }
  };

  const onDisLike = () => {
    if (DisLikeAction === null) {
      // dislike add
      Axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDisLikeAction("disliked");

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("싫어요 +1 실패..");
        }
      });
    } else {
      //dislike minus
      Axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDisLikeAction(null);
        } else {
          alert("싫어요 취소 실패");
        }
      });
    }
  };
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="좋아요">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="싫어요">
          <Icon
            type="dislike"
            theme={DisLikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
