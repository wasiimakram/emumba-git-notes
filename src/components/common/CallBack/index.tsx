import React, { useState } from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;

const CallBack: React.FC = () => {
  const handleCallback = async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      const clientId = process.env.REACT_APP_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
      const redirectUri = process.env.REACT_APP_REDIRECT_URI;
      // const response = await fetch(
      //   "https://github.com/login/oauth/access_token",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     body: JSON.stringify({
      //       client_id: clientId,
      //       client_secret: clientSecret,
      //       code: code,
      //       redirect_uri: redirectUri,
      //     }),
      //   }
      // );

      // const data = await response.json();
      // const accessToken = data.access_token;
      const accessToken = process.env.REACT_APP_ACCESS_TOKEN; // direct token
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        window.location.href = "/";
      }
    }
  };
  React.useEffect(() => {
    handleCallback();
  }, []);
  return (
    <Content>
      <Typography.Text>Authenticating. Please wait...</Typography.Text>
    </Content>
  );
};
export default CallBack;
