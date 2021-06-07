import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import "./new.css";
import { Row, Col, Card, Button, Rate } from "antd";
import { Tooltip } from 'antd';

const CardForm = ({ width, content, title, grade }) => {
  const [key, setKey] = useState('평점');
  const [number, setNumber] = useState({ grade });
  const [rate, setRate] = useState(<Rate defaultValue={grade} onChange={value => {
    setNumber(value);
  }}></Rate>)
  const contentList = {
    평점: <p>{content}</p>,
    별점: <p>{rate}</p>,
  };
  const onTabChange = () => {
    if (key === "평점") {
      setKey("별점");
    } else {
      setKey("평점");
    }
  };
  return (
    <Card
      title={title}
      extra={<Button onClick={onTabChange}><Tooltip title="이 음식에 얼마나 만족하셨나요?">{key}</Tooltip></Button>}
      style={{ width: { width }, height: "100%", borderRadius: "20px"}}
    >
      {contentList[key]}
    </Card>

  );
};

export default CardForm;