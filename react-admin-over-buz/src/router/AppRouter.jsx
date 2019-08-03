// @flow
import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { AppRoute, Whoops404, rand } from '@newtash/react-app-core';
import { routes } from '../config';

type Props = {
  doInitApp: () => void,
};

const AppRouter = (props: Props) => {
  const { doInitApp } = props;

  useEffect(() => {
    if (doInitApp) {
      // doInitApp();
    }
  }, []);

  return (
    <Switch>
      {routes.map(route => (
        <AppRoute
          key={rand()}
          exact={route.url === '/'}
          path={route.url}
          component={route.component}
        />
      ))}
      <AppRoute path="*" component={Whoops404} />
    </Switch>
  );
};

export default AppRouter;
