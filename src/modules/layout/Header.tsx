import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import "./layout.scss";
import isUserLoggedIn from "../../common/utils/auth";
import { items } from "../../common/utils/common";
import Buttons from "./common/Button";
import SearchInput from "./common/Search";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const Navbar: React.FC = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <Header className="app-header">
      <Row>
        <Col span={7}>
          <Content className="logo">
            <img className="img-fluid" src="assets/images/logo.jpg" alt="" />
            <Title level={2} className="logo-text">
              MUMBA
            </Title>
          </Content>
        </Col>
        <Col span={6} offset={7}>
          <SearchInput />
        </Col>
        <Col span={2}>
          <Buttons handleLogin={handleLogin} />
        </Col>
      </Row>
    </Header>
  );
};
export default Navbar;
