import React from "react";
import foodmap from './image/foodmap.png';
import { Image } from 'antd';
import { Row, Col } from "antd";
import Info from "./Info";
const Home = () => {
  return (
    <>
        <Row justify="space-around" align="middle" gutter={[24, 16]}>
            <Col span={11}>
                <Image
                    style={{ padding :"2em" }}
                    width={"100%"}
                    src={foodmap}
                    />
            </Col>
            <Col span={11}>
                <Info
                style={{ padding :"2em"}}/>
            </Col>
        </Row>
    </>
  );
};

export default Home;