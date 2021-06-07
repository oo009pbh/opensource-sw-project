import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Row, Col, Divider } from "antd";
const borderStyleb = { border: '1px solid palevioletred' , textAlign:"center", lineHeight:"100px" };
const borderStyles = { border: '1px solid palevioletred' , textAlign:"center", lineHeight:"50px" };
const borderStyled = { border: '1px solid palevioletred' , textAlign:"center", height:"2px"};
const rowStyle = { border: '1px solid palevioletred' , textAlign:"center", width: '100%', padding: 10 };

const Gunja = () => {

    const [menu, setMenu] = useState(
        () => (JSON.parse(window.localStorage.getItem("gunja"))) || null
    );

    useEffect(() => {
        console.log(menu);
    }, []);
    const MenuList = () => {
        return menu.map((item, i) => {
            return (
                <Row justify="space-around" style={rowStyle} wrap={true}>
                    <Col span={4}  style={borderStyleb} >
                            {item.day}
                    </Col>
                    <Col span={4} style={borderStyles}>
                            중식
                        <Divider style={borderStyled}/>
                            석식
                    </Col>
                    <Col span={16} style={borderStyles}>
                            {item.midmenu}
                        <Divider style={borderStyled}/>
                            {item.nightmenu}
                    </Col>
                </Row>
            );
        });
    }
    return (
        <>
            {MenuList()}
        </>
    );
};

export default Gunja;