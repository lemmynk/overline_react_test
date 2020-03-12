// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Form from './Form';
import {
  KomConfigProvider,
  KomMestaProvider,
  SearchProvider,
  DataFetchProvider,
} from '../../state';
import { KOM_MAIN_CRUD_URL } from '../../config';

export default () => {
  const match = useRouteMatch();
  return (
    <KomConfigProvider>
      <KomMestaProvider>
        <SearchProvider>
          <DataFetchProvider baseUrl={KOM_MAIN_CRUD_URL} sortBy="naziv">
            <Switch>
              <Route
                path={`${match.url}/:action(create|edit)/:id?`}
                component={Form}
              />
              <Route path={match.url} component={Dashboard} />
            </Switch>
          </DataFetchProvider>
        </SearchProvider>
      </KomMestaProvider>
    </KomConfigProvider>
  );
};
