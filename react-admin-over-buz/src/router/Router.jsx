// @flow
import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { routeFactory, Whoops404 } from '@newtash/react-app-core';
import {
  authConfig,
  headerConfig,
  sidebarConfig,
  footerConfig,
} from '../config';
// Pages
import DashboardPage from '../pages/DashboardPage';

type Props = {
  doInitApp: () => void,
};

const WebRoute = routeFactory({
  headerConfig,
  sidebarConfig,
  footerConfig,
});

const AdminRoute = routeFactory({
  authConfig,
  headerConfig,
  sidebarConfig,
  footerConfig,
});

const Router = (props: Props) => {
  const { doInitApp } = props;

  useEffect(() => {
    if (doInitApp) {
      doInitApp();
    }
  }, []);

  return (
    <Switch>
      <AdminRoute exact path="/" component={DashboardPage} />
      <WebRoute path="*" component={Whoops404} />
    </Switch>
  );
};

export default Router;
