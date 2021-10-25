import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const emailFocus = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailFocus.current) {
      emailFocus.current.focus();
    }
  }, []);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // Local Storage > Key store
        window.localStorage.setItem("userId", response.payload.userId);
        props.history.push("/");
        //console.log("로그인 성공", response.payload);
      } else {
        alert("로그인 실패했습니다.");
        console.log(response.payload);
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          value={Email}
          onChange={onEmailHandler}
          ref={emailFocus}
        />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
