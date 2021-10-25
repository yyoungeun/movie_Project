import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const emailFocus = useRef();

  useEffect(() => {
    if (emailFocus.current) {
      emailFocus.current.focus();
    }
  }, []);

  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onFirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("동일한 비밀번호를 입력해 주세요.");
    }

    let body = {
      email: Email,
      firstname: FirstName,
      lastname: LastName,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입을 실패했습니다.");
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
        <label>firstname</label>
        <input type="text" value={FirstName} onChange={onFirstNameHandler} />
        <label>lastname</label>
        <input type="text" value={LastName} onChange={onLastNameHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
