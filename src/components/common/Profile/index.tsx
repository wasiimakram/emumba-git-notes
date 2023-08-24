import React, { useState } from "react";
import { Layout, Typography } from "antd";
import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;
const ShortProfile: React.FC = () => {
  return (
    <Content className="profile-wrap">
      <img src="assets/images/user1.jpg" />
      <Content>
        <Title level={5} className="title">
          Ana John / Package.json
        </Title>
        <Text>Created 7 hours ago</Text>
        <br />
        <Text>Broadcast Server</Text>
      </Content>
    </Content>
  );
};
export default ShortProfile;
