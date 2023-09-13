import type { FC } from 'react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import type { ProtectedRouteProps } from '../../common/typings/auth';
import isUserLoggedIn from '../../common/utils/auth';

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component: Component,
  type,
  ...rest
}) => {
  if (type === 'auth' && !isUserLoggedIn()) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
