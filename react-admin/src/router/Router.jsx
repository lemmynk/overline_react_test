// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { rand } from '@newtash/core/utils';
import * as pages from './pages';
import appRoutes from '../config/appRoutes';

const Router = () => (
  <Switch>
    {appRoutes
      .filter(route => route.component)
      .map(route => (
        <Route
          key={rand()}
          path={route.url}
          component={pages[route.component]}
        />
      ))}
    <Route path="/" exact component={pages.HomePage} />
    <Route path="*" render={() => <div>...Ooops</div>} />
  </Switch>
);

export default Router;
