// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppTemplate, appProviderFactory } from '@newtash/react-app-core';
import AppRouter from './router';
import { layout, buildFontsLibrary } from './config';
import appSagas from './store/sagas';
import appReducers from './store/reducers';

// import i18n (needs to be bundled ;))
import './i18n';
import './index.css';

const withAuth = true;
const purgeStore = false;
const withWatchAndLog = false;
const appBlacklist = [];

const NewtashAppProvider = appProviderFactory({
  withAuth,
  purgeStore,
  withWatchAndLog,
  layout,
  appSagas,
  appReducers,
  appBlacklist,
});

const root = document.getElementById('root');
if (root) {
  buildFontsLibrary();

  ReactDOM.render(
    <NewtashAppProvider>
      <AppTemplate layout={layout} withAuth={withAuth}>
        <AppRouter />
      </AppTemplate>
    </NewtashAppProvider>,
    root,
  );
}
