import React from "react";
import { Skeleton, Card, Col } from "antd";
import "./card.scss";

type Props = {};
const CardSlate = (props: Props) => {
  return (
    <Col className="home-col-box" xs={24} sm={12} md={8} lg={8}>
      <Card className="single-card">
        <Skeleton
          loading={true}
          // avatar
          active
          paragraph={{ rows: 7 }}
        ></Skeleton>
      </Card>
    </Col>
  );
};

export default CardSlate;
