import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { ProtectedRouteProps } from "../../common/typings/auth";
import isUserLoggedIn from "../../common/utils/auth";
import { message } from "antd";

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component: Component,
  type,
  ...rest
}) => {
  if (type === "auth" && !isUserLoggedIn()) {
    return <Redirect to="/" />;
  }
  // return <Component {...rest} />;
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
