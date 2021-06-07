import React, { useState, useEffect, useCallback } from "react";
import "antd/dist/antd.css";
import "./index.css";
import "./new.css";
import { Layout, Menu } from "antd";
import MenuTable from "./menuTable";
import SubTable from "./subTable";
import Home from "./Home";
import Gunja from "./gunja";
import KaKaoLogin from 'react-kakao-login';
import styled from 'styled-components';

import { Tooltip, Button } from 'antd';
const axios = require("axios");

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 30%;
  height: auto;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

const { Header, Content } = Layout;

const App = () => {
  const [main, setMain] = useState(<Home />);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [changeMain, setChangeMain] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [gunja, setGunja] = useState(
    () => (JSON.parse(window.localStorage.getItem("gunja"))) || null
  );
  const [loginData, setLoginData] = useState(null);

  const getMenu = useCallback(async () => {
    const result = await axios.get("http://localhost:4000/api/studenthall");
    setMenu(result.data);
  }, []);

  const getGunja = useCallback(async () => {
    const result = await axios.get("http://localhost:4000/api/gunja");
    setGunja(result.data);
  }, []);

  const getRestaurant = useCallback(async () => {
    const cafe = await axios.get("http://localhost:4000/api/cafe");
    const chinesefood = await axios.get("http://localhost:4000/api/chinesefood");
    const koreanfood = await axios.get("http://localhost:4000/api/koreanfood");
    const japanesefood = await axios.get("http://localhost:4000/api/japanesefood");
    const bar = await axios.get("http://localhost:4000/api/bar");
    const temp = {
      "cafe": cafe,
      "chinesefood": chinesefood,
      "koreanfood": koreanfood,
      "japanesefood": japanesefood,
      "bar": bar,
    }
    console.log(temp);
    setRestaurant(temp);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("gunja", JSON.stringify(gunja));
  }, [gunja]);

  useEffect(() => {
    getMenu();
    getRestaurant();
    getGunja();
  }, [getMenu, getRestaurant, getGunja]);

  useEffect(() => {
    if (changeMain === "1") {
      setMain(<Home />)
    } else if (changeMain === "2") {
      setMain(<MenuTable menu={menu} />)
    } else if (changeMain === "3") {
      setMain(<SubTable restaurant={restaurant} />)
    } else if (changeMain === "4") {
      setMain(<Gunja />)
    } else if (changeMain === "5") {
      
    }
  }, [changeMain]);

  const onChangeContent = (e) => {
    setChangeMain(e.key);
  };

  const responseKaKao = (res) => {
    console.log(res.profile.properties.nickname);
    setLoginData(res.profile.properties.nickname); 
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? 
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item
                onClick={onChangeContent}
                key="1">
                  <Tooltip interactive title="처음화면으로 돌아가기">
                       홈    
                  </Tooltip>
              </Menu.Item>

              <Menu.Item
                onClick={onChangeContent}
                key="2">
                  <Tooltip interactive title="맛있고 가격도 착한 학식">
                     학생회관 
                  </Tooltip>
              </Menu.Item>  

              <Menu.Item
                onClick={onChangeContent}
                key="3">
                  <Tooltip interactive title="학식에 지친 당신이여 떠나라!">
                    외부시설 
                  </Tooltip>
              </Menu.Item>
            
              <Menu.Item
                onClick={onChangeContent}
                key="4">
                  <Tooltip interactive title="왜인지 현재 운영중!?">
                    군자의 밥상 
                  </Tooltip> 
              </Menu.Item>
            
              <Menu.Item key="5">
                <Tooltip interactive title="* 현재 운영 중이지 않습니다! *">
                  진관홀_B1  
                </Tooltip>
              </Menu.Item>
            
              <Menu.Item key="6">
                <Tooltip interactive title="* 현재 운영 중이지 않습니다! *">
                  우정당_1F  
                </Tooltip>
              </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "1em", marginTop: 64, height:"100%"}}
        >
          {main}
        </Content>
      </Layout> : 
      (
          <div id ="container">
            {/* <img className="logo_image" src="./resources/images/logo2.png" style={{ marginTop: "80px" }} /> */}
            <div id ="kakao">
              <KaKaoBtn
                jsKey={"384958885337854c45cdb3a5c9c539ac"}
                buttonText='카카오 계정으로 로그인'
                onSuccess={responseKaKao}
                getProfile={true}
              />
            </div>
          </div>
        )}
    </>
  );
};
export default App;
