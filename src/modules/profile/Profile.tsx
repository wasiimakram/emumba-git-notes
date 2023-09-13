import './profile.scss';

import { Col, Image, Layout, Row, Typography } from 'antd';
import React from 'react';

import SingleCard from './SingleCard';

const { Content } = Layout;
const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <Layout className="profile-main-wrap">
      <Content className="ant-container">
        <Row className="profile-row">
          <Col span={8} className="left-wrap">
            <Content className="image-wrap">
              <Image src="assets/images/user4.jfif" />
              <Title level={4} className="title">
                Muhammad Wasim Akram
              </Title>
              <a target="_blank" href="https://github.com/wasiimakram">
                View GitHub Profile
              </a>
            </Content>
          </Col>
          <Col span={16} className="right-wrap">
            <SingleCard />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default Profile;
