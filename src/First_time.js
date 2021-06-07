import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";

import { Modal, Button } from 'antd';
import { Tooltip } from 'antd';

const First_time = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  return (
    <>
        <Button type="primary" danger onClick={showModal}>
            <Tooltip  title="더 자세한 설명을 원한다면 클릭하세요!">
                처음이신가요?
            </Tooltip>
        </Button>
        <Modal title="홈페이지 사용설명서" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>1. 좌측 상단의 메뉴를 통해서 원하는 식당을 선택하세요.</p>
            <p>2. 선택한 식당메뉴의 평점 버튼을 눌러서 평점을 매길 수 있습니다.</p>
            <p>3. 다른 사람들과 당신의 점수를 공유해보세요.</p>
        </Modal>
    </>
  );
};

export default First_time;