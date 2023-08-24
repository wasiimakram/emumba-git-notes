import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ProtectedRouteProps } from "../../common/typings/auth";

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component: Component,
  type,
  ...rest
}) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const authUser = useSelector(selectAuthUser);
  const isLoggedIn = false;
  const authUser = {};
  const redirectTo = type === "admin" ? "/admin-login" : "/login";
  // || authUser?.type !== type
  if (!isLoggedIn) {
    return <Redirect to={redirectTo} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
