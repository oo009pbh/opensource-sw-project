import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { List } from "antd";
import CardForm from "./CardForm";
import shimagelist from "./image/studenthall/shimagelist.js";

const MenuTable = ({menu}) => {
  return (
    <>
      <List
        grid={{ gutter: [32 , 32], column: 3 }}
        dataSource={menu}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 9,
        }}
        renderItem={item => (
          <List.Item>
            <CardForm width={300} content={item.cost} title={item.menu} grade={item.grade} foodimg={shimagelist[item.menu]} />
          </List.Item>
        )}
      />,
    </>
  );
};

export default MenuTable;