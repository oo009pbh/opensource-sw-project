import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { List } from "antd";
import CardForm from "./CardForm";

const MenuTable = ({menu}) => {
  
  return (
    <>
      <List
        grid={{ gutter: [16 , 16], column: 4 }}
        dataSource={menu}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 16,
        }}
        renderItem={item => (
          <List.Item>
            <CardForm width={300} content={item.cost} title={item.menu} grade={item.grade} />
          </List.Item>
        )}
      />,
    </>
  );
};

export default MenuTable;