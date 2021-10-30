import React, { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const videoId = props.videoId;
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");

  const comment = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const variable = {
      writer: user.userData._id,
      videoId: videoId,
      content: CommentValue,
    };

    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        console.log("result", response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p>
        댓글 &nbsp;
        <MessageOutlined />
      </p>
      <hr />
      {/* comment list */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                {/* 댓글 확인창 */}
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  videoId={videoId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  videoId={videoId}
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment */}
      <br />
      <form style={{ display: "flex" }} onSubmit={onSubmitHandler}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={comment}
          value={CommentValue}
          placeholder="댓글을 입력해 주세요"
        />
        &nbsp;&nbsp;
        <button
          style={{ width: "20%", height: "50px" }}
          onClick={onSubmitHandler}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}

export default Comment;
