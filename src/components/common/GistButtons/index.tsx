import React, { useState } from "react";
import { Layout, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ForkOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Content } = Layout;
const { Text } = Typography;

const GistButtons: React.FC = () => {
  return (
    <Content className="icons">
      <Text className="wrap">
        <EditOutlined /> <Text>Edit</Text>
      </Text>
      <Text className="wrap">
        <DeleteOutlined /> <Text>Delete</Text>
      </Text>
      <Text className="wrap">
        <StarOutlined /> <Text>Star</Text> <Text className="counter">0</Text>
      </Text>
      <Text className="wrap">
        <ForkOutlined /> <Text>Fork</Text> <Text className="counter">0</Text>
      </Text>
    </Content>
  );
};
export default GistButtons;
