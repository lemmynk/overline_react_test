// @flow
import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { routeFactory, Whoops404 } from '@newtash/react-app-core';
import {
  authConfig,
  headerConfig,
  sidebarConfig,
  footerConfig,
  HOME,
  ARTIKLI,
} from '../config';
// Pages
import { DashboardPage, ArtikliPage } from '../pages';

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
      <AdminRoute exact path={ARTIKLI} component={ArtikliPage} />

      <AdminRoute exact path={HOME} component={DashboardPage} />
      <WebRoute path="*" component={Whoops404} />
    </Switch>
  );
};

export default Router;
