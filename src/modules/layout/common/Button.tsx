import React from "react";
import isUserLoggedIn from "../../../common/utils/auth";
import { Button, Dropdown, Layout, Menu } from "antd";
import { items } from "../../../common/utils/common";
import { Link } from "react-router-dom";

type Props = {
  handleLogin: () => void;
};

const Buttons: React.FC<Props> = ({ handleLogin }) => {
  const menu = (
    <Menu>
      {items &&
        items.map((item: any) => (
          <Menu.Item key={item.key}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          </Menu.Item>
        ))}
    </Menu>
  );
  return !isUserLoggedIn() ? (
    <Layout.Content className="explore_btn">
      <Button onClick={handleLogin} type="primary" className="login-button">
        Login
      </Button>
    </Layout.Content>
  ) : (
    // <Dropdown menu={{ menu }} placement="bottom" arrow>
    <img src="assets/images/user3.jpg" alt="Icon" className="profile-img" />
    // </Dropdown>
  );
};

export default Buttons;
