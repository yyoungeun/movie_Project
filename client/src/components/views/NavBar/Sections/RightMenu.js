/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.post(`${USER_SERVER}/logout`).then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="register">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/videoUpload">Video UPLOAD</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
