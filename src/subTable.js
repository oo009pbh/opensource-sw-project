import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Row, Col, Button } from "antd";
import CardForm from "./CardForm";

const SubTable = ({restaurant}) => {
  return (
    <>
      <Row justify="center" align ="middle" gutter={[32 , 16]} style = {{marginBottom : "100px"}}>
        <Col span={6}>
          <Button className="button-restaurant" block = {true}>
            카페
          </Button>
        </Col>
        <Col span={6}>
          <Button block = {true}>
            한식
          </Button>
        </Col>
        <Col span={6}>
          <Button block = {true}>
            일식
          </Button>
        </Col>
      </Row>
      <Row justify="center" align ="middle" gutter={[16 , 16]}>
        <Col span={6}>
          <Button block = {true}>
            중식
          </Button>
        </Col>
        <Col span={6}>
          <Button block = {true}>
            술집
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SubTable;