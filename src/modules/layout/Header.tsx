import './layout.scss';

import { Col, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Buttons from './common/Button';
import SearchInput from './common/Search';
import { Container } from '@mui/material';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Navbar: React.FC = () => {
  const history = useHistory();
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };
  return (
    <Header className="app-header">
      <Container maxWidth="lg" className="ant-container">
        <Row>
          <Col span={8}>
            <Content
              className="logo"
              onClick={() => {
                history.push('/');
              }}
            >
              <img className="img-fluid" src="assets/images/logo.jpg" alt="" />
              <Title level={2} className="logo-text">
                MUMBA
              </Title>
            </Content>
          </Col>
          <Col className="headerFormm" span={9} offset={7}>
            <SearchInput /> <Buttons handleLogin={handleLogin} />
          </Col>
        </Row>
      </Container>
    </Header>
  );
};
export default Navbar;
