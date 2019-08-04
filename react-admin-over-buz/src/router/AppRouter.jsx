// @flow
import React from 'react';
import { Switch } from 'react-router-dom';
import { AppRoute, Whoops404, rand } from '@newtash/react-app-core';
import appRoutes from '../config/appRoutes';
import * as pages from '../pages';

const AppRouter = () => (
  <Switch>
    {appRoutes.map(route => (
      <AppRoute
        key={rand()}
        exact={route.url === '/'}
        path={route.url}
        component={pages[route.component]}
      />
    ))}
    <AppRoute path="*" component={Whoops404} />
  </Switch>
);

export default AppRouter;
