import React, { useState } from "react";
import { Layout, Typography, Input, Row, Col, Button } from "antd";
import "./layout.scss";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const Navbar: React.FC = () => {
  const clientId = "47a13874a873bb510b9f";
  const redirectUri = "http://localhost:3000/callback";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };
  return (
    <Header className="app-header">
      <Row>
        <Col span={6}>
          <Content className="logo">
            <img className="img-fluid" src="assets/images/logo.jpg" alt="" />
            <Title level={2} className="logo-text">
              MUMBA
            </Title>
          </Content>
        </Col>
        <Col span={6} offset={7}>
          <Search
            className="nav-search"
            placeholder="Search Notes..."
            // onSearch={onSearch}
          />{" "}
        </Col>
        <Col span={3}>
          <Content className="explore_btn">
            <Button
              onClick={handleLogin}
              type="primary"
              className="login-button"
            >
              Login
            </Button>
          </Content>
        </Col>
      </Row>
    </Header>
  );
};
export default Navbar;
