import React from 'react';
import { Typography, Col } from 'antd';
import './norecord.scss';
type Props = {};
const NoRecord: React.FC<Props> = ({}) => {
  return (
    <Col className="no-record" xs={24} sm={24} md={24} lg={24}>
      <Typography.Title level={4}>No Record Found!</Typography.Title>
    </Col>
  );
};

export default NoRecord;
