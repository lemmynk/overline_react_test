// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppTemplate, appProviderFactory } from '@newtash/react-app-core';
import AppRouter from './router';
import { layout, buildFontsLibrary } from './config';

// import i18n (needs to be bundled ;))
import './i18n';

const NewtashAppProvider = appProviderFactory({
  // withAuth: true,
  purgeStore: true,
  layout,
});

const root = document.getElementById('root');
if (root) {
  buildFontsLibrary();

  ReactDOM.render(
    <NewtashAppProvider>
      <AppTemplate layout={layout}>
        <AppRouter />
      </AppTemplate>
    </NewtashAppProvider>,
    root,
  );
}
/*
    withAuth,
    purgeStore,
    appBlacklist: [],
    appReducers: {},
    appSagas: [],
*/
