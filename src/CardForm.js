import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Button, Rate } from "antd";

const CardForm = ({width, content, title, grade}) => {
  const [key,setKey] = useState('평점');
  const [number,setNumber] = useState({grade});
  const [rate,setRate] = useState(<Rate defaultValue ={grade} onChange={value => {
    setNumber(value);
  }}></Rate>)
  const contentList = {
    평점: <p>{content}</p>,
    별점: <p>{rate}</p>,
  };
  const onTabChange = () => {
    if (key === "평점")
    {
      setKey("별점");
    }else{
      setKey("평점");
    }
  };
  return (
    <>
      <Card
          title={title}
          extra={<Button onClick = {onTabChange}>{key}</Button>}
          style={{ width: {width} }}
        >
          {contentList[key]}
      </Card>
    </>
  );
};

export default CardForm;