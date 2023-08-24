import React from "react";
import { Avatar, List, Skeleton, Switch, Card, Typography, Col } from "antd";
import GistCode from "../GistCode";
import "./card.scss";

type Props = {};

const CardSlate = (props: Props) => {
  const { Title, Text } = Typography;
  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <Card className="single-card">
        <Skeleton loading={true} avatar active></Skeleton>
      </Card>
    </Col>
  );
};

export default CardSlate;
