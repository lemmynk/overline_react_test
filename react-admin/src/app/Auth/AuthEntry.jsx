// @flow
import React, { type Node, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  LOGIN_PAGE_PATH,
  LOGOUT_PAGE_PATH,
  CALLBACK_PAGE_PATH,
  // APP_CONFIG_PAGE_PATH,
} from '../../config';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import CallbackPage from './CallbackPage';
// import AppConfigPage from '../AppConfigPage';
import { authUrl } from '../../utils';

type Props = {
  children: Node,
};

const AuthEntry = (props: Props) => {
  const { children: AppComponent } = props;

  const authLoginUrl = `${authUrl()}/login`;

  const renderLoginPage = useCallback(
    () => <LoginPage url={authLoginUrl} />,
    [],
  );

  const renderLogoutPage = useCallback(() => <LogoutPage />, []);

  const renderCallbackPage = useCallback(() => <CallbackPage />, []);

  // const renderAppConfigPage = useCallback(() => <AppConfigPage />, []);

  return (
    <Switch>
      <Route path={LOGIN_PAGE_PATH} render={renderLoginPage} />
      <Route path={LOGOUT_PAGE_PATH} render={renderLogoutPage} />
      <Route path={CALLBACK_PAGE_PATH} render={renderCallbackPage} />
      {/* {withAuth && (
          <Route path={APP_CONFIG_PAGE_PATH} render={renderAppConfigPage} />
        )} */}
      <Route path="/" component={() => AppComponent} />
    </Switch>
  );
};

export default AuthEntry;
/*

  return (
    <Switch>
      <Route path="/" component={() => AppComponent} />
    </Switch>
  );

*/
