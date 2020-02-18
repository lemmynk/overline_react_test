// @flow
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ArtMainPage from './ArtMainPageContainer';
import ArtMainForm from '../../forms/ArtMainForm';

export default () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${match.url}/:action(create|edit)/:id?`}
        component={ArtMainForm}
      />
      <Route path={match.url} component={ArtMainPage} />
    </Switch>
  );
};