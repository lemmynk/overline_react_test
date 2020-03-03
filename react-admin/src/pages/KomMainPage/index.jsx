// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Form from './Form';
import { KomMestaProvider } from '../../context';

export default () => {
  const match = useRouteMatch();
  return (
    <KomMestaProvider>
      <Switch>
        <Route
          path={`${match.url}/:action(create|edit)/:id?`}
          component={Form}
        />
        <Route path={match.url} component={Dashboard} />
      </Switch>
    </KomMestaProvider>
  );
};
