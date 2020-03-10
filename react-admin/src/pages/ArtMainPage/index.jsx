// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  ArtConfigProvider,
  ArtPdvProvider,
  ArtGroupsProvider,
} from '../../state';
import Dashboard from './Dashboard';
import Form from './Form';

export default () => {
  const match = useRouteMatch();

  return (
    <ArtConfigProvider>
      <ArtPdvProvider>
        <ArtGroupsProvider>
          <Switch>
            <Route
              path={`${match.url}/:action(create|edit)/:id?`}
              component={Form}
            />
            <Route path={match.url} component={Dashboard} />
          </Switch>
        </ArtGroupsProvider>
      </ArtPdvProvider>
    </ArtConfigProvider>
  );
};
