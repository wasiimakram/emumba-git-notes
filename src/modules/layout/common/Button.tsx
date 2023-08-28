import React from "react";
import isUserLoggedIn from "../../../common/utils/auth";
import { Button, Dropdown, Layout, Menu, MenuProps, Typography } from "antd";
import { Link } from "react-router-dom";
import { items } from "./Columns";
type Props = {
  handleLogin: () => void;
};
const Buttons: React.FC<Props> = ({ handleLogin }) => {
  return !isUserLoggedIn() ? (
    <Layout.Content className="explore_btn">
      <Button onClick={handleLogin} type="primary" className="login-button">
        Login
      </Button>
    </Layout.Content>
  ) : (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <img src="assets/images/user4.jfif" alt="Icon" className="profile-img" />
    </Dropdown>
  );
};

export default Buttons;
