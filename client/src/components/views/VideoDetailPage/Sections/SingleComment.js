import React from "react";
import { Comment, Avatar } from "antd";
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {
  const onClickReplyOpen = () => {
    alert("reply to!");
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
  );
}

export default SingleComment;
