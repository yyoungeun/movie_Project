import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  //option
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지

  //adminRoute
  // null => 기본값
  // admin만 허용 => true

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //login하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("./login");
          }
        } else {
          //login한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
