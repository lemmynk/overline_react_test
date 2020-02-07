// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { rand } from '@newtash/core/utils';
import { AppRoute } from '../app/Routes';
import * as pages from './pages';
import appRoutes from '../config/appRoutes';

const Router = () => (
  <Switch>
    {appRoutes
      .filter(route => route.component)
      .map(route => (
        <AppRoute
          key={rand()}
          path={route.url}
          component={pages[route.component]}
        />
      ))}
    <AppRoute path="/" exact component={pages.HomePage} />
    <Route path="*" render={() => <div>...Ooops</div>} />
  </Switch>
);

export default Router;
