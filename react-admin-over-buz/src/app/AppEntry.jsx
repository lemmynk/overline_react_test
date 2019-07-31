// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppTemplate } from './layout';
import AppRouter from './AppRouter';
import {
  LOGIN_PAGE_PATH,
  LOGOUT_PAGE_PATH,
  CALLBACK_PAGE_PATH,
} from '../config';

import Login from './Login';
import Logout from './Logout';
import Callback from './Callback';

const EntryPoint = () => (
  <Router>
    <Switch>
      <Route path={LOGIN_PAGE_PATH} component={Login} />
      <Route path={LOGOUT_PAGE_PATH} component={Logout} />
      <Route path={CALLBACK_PAGE_PATH} component={Callback} />
      <Route path="*" render={() => <AppTemplate routes={AppRouter} />} />
    </Switch>
  </Router>
);

export default EntryPoint;
