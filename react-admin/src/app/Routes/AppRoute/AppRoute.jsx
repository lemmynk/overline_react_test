// @flow
import React, { type ComponentType, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Whoops403Page } from '../../WhoopsPages';
import { LOGIN_PAGE_PATH, LOGOUT_PAGE_PATH } from '../../../config';

type Props = {
  path: string,
  component: ComponentType<any>,
  exact: boolean,
  isAuthenticated: boolean,
  hasPermission: boolean,
  setAppRedirectUrl: string => void,
};

const AppRoute = (props: Props) => {
  const {
    path,
    exact,
    component: AppComponent,
    isAuthenticated,
    hasPermission,
    setAppRedirectUrl,
  } = props;

  const renderComponent = useCallback(() => {
    if (!isAuthenticated || path === LOGOUT_PAGE_PATH) {
      return <Redirect to={LOGIN_PAGE_PATH} />;
    }
    return <AppComponent />;
  }, []);

  if (!isAuthenticated && setAppRedirectUrl) {
    setAppRedirectUrl(path);
  }

  if (hasPermission) {
    return <Route path={path} exact={exact} render={renderComponent} />;
  }

  return <Whoops403Page />;
};

export default AppRoute;
