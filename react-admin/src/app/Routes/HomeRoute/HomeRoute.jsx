// @flow
import React, { type ComponentType } from 'react';

type Props = {
  hasAuth: boolean,
  isAuthenticated: boolean,
  component: ComponentType<any>,
  appComponent?: ComponentType<any>,
};

const HomeRoute = (props: Props) => {
  const {
    hasAuth,
    isAuthenticated,
    component: WebHomePage,
    appComponent: AppHomePage,
  } = props;

  if (hasAuth && isAuthenticated && AppHomePage) {
    return <AppHomePage />;
  }

  return <WebHomePage />;
};

HomeRoute.defaultProps = {
  appComponent: undefined,
};

export default HomeRoute;
