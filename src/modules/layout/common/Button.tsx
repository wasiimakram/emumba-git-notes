import React from "react";
import isUserLoggedIn from "../../../common/utils/auth";
import { Button, Dropdown, Layout } from "antd";
import { items } from "../../../common/utils/common";

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
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <img src="assets/images/user1.jpg" alt="Icon" className="profile-img" />
    </Dropdown>
  );
};

export default Buttons;
