// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Form from './Form';
import { KomConfigProvider, KomMestaProvider } from '../../state';

export default () => {
  const match = useRouteMatch();
  return (
    <KomConfigProvider>
      <KomMestaProvider>
        <Switch>
          <Route
            path={`${match.url}/:action(create|edit)/:id?`}
            component={Form}
          />
          <Route path={match.url} component={Dashboard} />
        </Switch>
      </KomMestaProvider>
    </KomConfigProvider>
  );
};
