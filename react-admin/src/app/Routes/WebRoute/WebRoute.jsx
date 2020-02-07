// @flow
import React, { type ComponentType } from 'react';
import { Route } from 'react-router-dom';

type Props = {
  path: string,
  exact: boolean,
  component: ComponentType<any>,
};

const WebRoute = (props: Props) => {
  const { path, exact, component: AppComponent } = props;

  return <Route path={path} exact={exact} component={() => <AppComponent />} />;
};

export default WebRoute;
