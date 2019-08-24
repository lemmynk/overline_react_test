// @flow
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { CreateForm, EditForm } from './Form';
import { CRUD_URL_CREATE, CRUD_URL_EDIT } from '../../../config';

type Props = {
  match: ReactRouterMatch,
};

const ArtMainPage = (props: Props) => {
  const { match } = props;
  const { url: basePath } = match;

  return (
    <Switch>
      <Route
        path={`${basePath}/${CRUD_URL_CREATE}/:vArtikl/:grpId?`}
        component={CreateForm}
      />
      <Route
        path={`${basePath}/${CRUD_URL_EDIT}/:artId`}
        component={EditForm}
      />
      <Route path={basePath} render={() => <Dashboard basePath={basePath} />} />
    </Switch>
  );
};

export default withRouter(ArtMainPage);
