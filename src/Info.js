import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import "./First_time.js";
import { Card } from "antd";
import First_time from "./First_time.js";

const Info = () => {
  return (
    <>
      <Card
        title="세종대 학식 알림 사이트"
        extra={<First_time
          style={{ padding :"2em"}}/>}
      >
        <p>세종대 학식 및 편의시설 안내 사이트에 오신것을 환영합니다!</p>
        <p>위 버튼을 클릭하시어 메뉴를 확인하고 평점을 매겨주세요!</p>
      </Card>
    </>
  );
};

export default Info;