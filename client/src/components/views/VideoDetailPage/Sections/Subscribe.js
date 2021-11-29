import React, { useEffect, useState } from "react";
import { BellFilled } from "@ant-design/icons";
import Axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  let variable = { userTo: props.userTo };
  useEffect(() => {
    // 현재 구독자 수
    Axios.post("/api/subscribe/SubscribeNumber", variable).then((response) => {
      if (response.data.success) {
        //console.log("subscibeNumber", response.data.subscibeNumber);
        setSubscribeNumber(response.data.subscibeNumber);
      } else {
        alert("구독자 수를 불러오지 못했습니다.");
      }
    });

    // 구독중인지 아닌지 (현재 id기준)
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/Subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          //console.log("subscribed", response.data.subscribed);
          setSubscribed(response.data.subscribed);
        } else {
          alert("현재 구독 상태를 불러오지 못했습니다.");
        }
      }
    );
  }, []);

  const onSubscribeHandler = () => {
    let variable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (Subscribed) {
      // 구독 취소
      Axios.post("/api/subscribe/unSubscribe", variable).then((response) => {
        if (response.data.success) {
          //console.log("unsubscrie", response.data);
          setSubscribeNumber(SubscribeNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 취소를 실패했습니다.");
        }
      });
    } else {
      // 구독 추가
      Axios.post("/api/subscribe/upscuscribe", variable).then((response) => {
        if (response.data.success) {
          //console.log("subscribe", response.data);
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 추가 실패했습니다.");
        }
      });
    }
  };
  return (
    <div>
      <button
        style={{
          background: `${Subscribed ? "#ADADAD" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "5px 11px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribeHandler}
      >
        {Subscribed ? "구독 중" : "구독 하기"}
        <BellFilled />
        <br />
        {SubscribeNumber}
      </button>
    </div>
  );
}

export default Subscribe;
