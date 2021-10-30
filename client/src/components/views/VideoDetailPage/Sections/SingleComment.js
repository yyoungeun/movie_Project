import React, { useState } from "react";
import { Comment, Avatar, Input } from "antd";
import LikeDislikes from "./LikeDislikes";
import Axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [ReplyCommentValue, setReplyCommentValue] = useState("");
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setReplyCommentValue(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const variable = {
      content: ReplyCommentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };

    // 대댓글 save
    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        console.log("result", response.data.result);
        props.refreshFunction(response.data.result);
        setReplyCommentValue("");
        setOpenReply(false);
      } else {
        alert("대댓글 저장에 실패했습니다.");
      }
    });
  };
  const actions = [
    <LikeDislikes
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span
      key="comment-nested-reply-to"
      onClick={onClickReplyOpen}
      style={{ paddingLeft: "10px" }}
    >
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.lastname + props.comment.writer.firstname}
        avatar={
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            alt={props.comment.writer.email}
          />
        }
        content={props.comment.content}
      />
      {OpenReply && (
        // root comment 동일
        <form style={{ display: "flex" }} onSubmit={onSubmitHandler}>
          <textarea
            style={{
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #2F4CFC",
            }}
            onChange={onHandleChange}
            value={ReplyCommentValue}
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
      )}
    </div>
  );
}

export default SingleComment;
