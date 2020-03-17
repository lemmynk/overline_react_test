// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  ArtConfigProvider,
  ArtPdvProvider,
  ArtGroupsProvider,
  SearchProvider,
  DataFetchProvider,
} from '../../state';
import Dashboard from './Dashboard';
import Form from './Form';
import { ART_MAIN_CRUD_URL } from '../../config';

export default () => {
  const match = useRouteMatch();

  return (
    <ArtConfigProvider>
      <ArtPdvProvider>
        <ArtGroupsProvider>
          <SearchProvider>
            <DataFetchProvider baseUrl={ART_MAIN_CRUD_URL} sortBy="artNaziv">
              <Switch>
                <Route
                  path={`${match.url}/:action(create|edit)/:id?`}
                  component={Form}
                />
                <Route path={match.url} component={Dashboard} />
              </Switch>
            </DataFetchProvider>
          </SearchProvider>
        </ArtGroupsProvider>
      </ArtPdvProvider>
    </ArtConfigProvider>
  );
};
