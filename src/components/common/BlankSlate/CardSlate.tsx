import React from "react";
import { Avatar, List, Skeleton, Switch, Card, Typography } from "antd";
import GistCode from "../GistCode";
import "./card.scss";

type Props = {};

const CardSlate = (props: Props) => {
  const { Title, Text } = Typography;
  return (
    <Card className="single-card">
      <Skeleton loading={true} avatar active></Skeleton>
    </Card>
  );
};

export default CardSlate;
