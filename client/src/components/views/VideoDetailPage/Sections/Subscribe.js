import React from "react";
import { BellFilled } from "@ant-design/icons";

function Subscribe() {
  return (
    <div>
      <button
        style={{
          background: "#CC0000",
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        구독
        <BellFilled />
      </button>
    </div>
  );
}

export default Subscribe;
