import React, { useState } from "react";
import { Typography, Card, Avatar, Image, Button } from "antd";

import { Content } from "antd/es/layout/layout";
import ReactEmbedGist from "react-embed-gist";
import "./../home.scss";
import GistCode from "../../../components/common/GistCode";
import { formatTimeDifference } from "../../../common/utils/timeUtils";
const { Title, Text } = Typography;

interface GridProps {
  item: any;
}
const GridCard: React.FC<GridProps> = ({ item }) => {
  const gist = item.id;
  const file = Object.keys(item.files)[0];
  return (
    <>
      <Card key={item.id} className="single-card">
        <GistCode id={`${item.owner.login}/${item.id}`} file={file} />
        <Content className="footer-wrap">
          <img src={item.owner.avatar_url} />
          <Content>
            <Title level={5} className="title">
              {item.owner.login} / {file}
            </Title>
            <Text>Created {formatTimeDifference(item.created_at)}</Text>
            <br />
            <Text>{item.owner.type}</Text>
          </Content>
        </Content>
      </Card>
    </>
  );
};
export default GridCard;
