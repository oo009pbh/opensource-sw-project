import React, { useState, useEffect , useCallback } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import MenuTable from "./menuTable";
import SubTable from "./subTable";
import Home from "./Home";
const axios = require("axios");

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [main, setMain] = useState(<Home/>);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [changeMain, setChangeMain] = useState(1);
  const getMenu = useCallback (async () => {
    const result = await axios.get("http://localhost:4000/api/studenthall");
    setMenu(result.data);
  }, []);

  const getRestaurant = useCallback (async () => {
    const cafe = await axios.get("http://localhost:4000/api/cafe");
    const chinesefood = await axios.get("http://localhost:4000/api/chinesefood");
    const koreanfood = await axios.get("http://localhost:4000/api/koreanfood");
    const japanesefood = await axios.get("http://localhost:4000/api/japanesefood");
    const bar = await axios.get("http://localhost:4000/api/bar");
    const temp = {
      cafe : cafe,
      chinesefood : chinesefood,
      koreanfood : koreanfood,
      japanesefood : japanesefood,
      bar : bar,
    }
    setRestaurant(temp);
  }, []);

  useEffect(() => {
    getMenu();
    getRestaurant();
  }, [getMenu, getRestaurant]);

  useEffect(() => {
    if (changeMain === "1"){
      setMain(<Home/>)
    }else if(changeMain === "2"){
      setMain(<MenuTable menu = {menu}/>)
    }else if(changeMain === "3"){
      setMain(<SubTable restaurant = {restaurant}/>)
    }else if(changeMain === "4"){

    }else if(changeMain === "5"){

    }
  }, [changeMain]);

  const onChangeContent = (e) => {
    setChangeMain(e.key);
  };
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1 , width: "100%" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item 
            onClick={onChangeContent}  
            key="1">     홈    </Menu.Item>
          <Menu.Item 
            onClick={onChangeContent}  
            key="2"> 학생회관 </Menu.Item>
          <Menu.Item 
            onClick={onChangeContent}  
            key="3"> 외부시설 </Menu.Item>
          <Menu.Item key="4">학생회관_B1</Menu.Item>
          <Menu.Item key="5">진관홀_B1  </Menu.Item>
          <Menu.Item key="6">우정당_1F  </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "1em", marginTop: 64}}
      >
        {main}
      </Content>
    </Layout>
  );
};
export default App;
