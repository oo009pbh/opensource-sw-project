import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Row, Col, Card, List, Skeleton} from "antd";
import CardForm from "./SubCardForm";
import subimagelist from "./image/restaurant/subimagelist.js";
const { Meta } = Card;

const SubTable = ({ restaurant }) => {
  const [main, setMain] = useState("");
  const [content, setContent] = useState(<Skeleton active/>);

  useEffect(() => {
    setContent(<BeforeClick/>);
  },[])

  useEffect(() => {
    if(main !== "")
    {
      console.log(main);
      setContent(<AfterClick/>);
    }
  }, [main])

  const onChangeMain = (e) => {
    if(e.target.alt !== undefined)
    {
      setMain(e.target.alt);
    }
  }
  const CardCategory = ({ name, category }) => {
    return (
      <Card
        align="center"
        hoverable
        style={{ width: 240}}
        cover={<img alt={name} src={subimagelist[category]}/>}
        onClick={onChangeMain}
      >
        <Meta key={name} title={category} style={{ textAlign: "center" }} />
      </Card>
    );
  }
  const BeforeClick = () => {
    return (
      <div style={{backgroundColor:"#FECCBE"}}>
        <Row justify="center" align="middle" gutter={[32, 32]}>
          <Col span={6}>
            <CardCategory name="cafe" category="카페" />
          </Col>
          <Col span={6}>
            <CardCategory name="koreanfood" category="한식" />
          </Col>
          <Col span={6}>
            <CardCategory name="chinesefood" category="중식" />
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[32, 32]}>
          <Col span={6}>
            <CardCategory name="japanesefood" category="일식" />
          </Col>
          <Col span={6}>
            <CardCategory name="bar" category="술집" />
          </Col>
        </Row>
      </div>
    )
  }
  const AfterClick = () => {
    return (
      <>
        <List
          grid={{ gutter: [16, 16], column: 3}}
          dataSource={restaurant[main].data}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 9,
          }}
          renderItem={item => (
            <List.Item>
              <CardForm width={400} content={item.category} title={item.menu} grade={item.grade}/>
            </List.Item>
          )}
        />,
      </>
    )
  }
  return (
    <>
      {content}
    </>
  );
};

export default SubTable;