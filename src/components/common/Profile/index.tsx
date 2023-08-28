import React from "react";
import { Layout, Typography } from "antd";
import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

interface ProfileProps {
  avatar?: string;
  name?: string;
  file?: string;
  time?: string;
  keyword?: string;
}
const ShortProfile: React.FC<ProfileProps> = ({
  avatar,
  name,
  file,
  time,
  keyword,
}) => {
  return (
    <Content className="profile-wrap">
      <img src={avatar} />
      <Content>
        <Title level={5} className="title">
          {name} / {file}
        </Title>
        <Text>Created {time}</Text>
        <br />
        <Text>{keyword}</Text>
      </Content>
    </Content>
  );
};
export default ShortProfile;
