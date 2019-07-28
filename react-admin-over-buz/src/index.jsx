// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { appProviderFactory } from '@newtash/react-app-core';
import buildFontsLibrary from './config/fontsLibrary';
import Router from './router';
import appTheme from './config/appTheme';
import { authConfig } from './config';
// import appReducers from './store/reducers';
// import appSagas from './store/sagas';

import './i18n';

const { NewtashAppProvider } = appProviderFactory({
  // appTranslations: { sr: { question: 'What?' } },
  appTheme,
  appBlacklist: [],
  // appReducers,
  // appSagas,
  purgeStore: false,
  authConfig,
});

const root = document.getElementById('root');
if (root) {
  buildFontsLibrary();

  ReactDOM.render(
    <NewtashAppProvider>
      <Router />
    </NewtashAppProvider>,
    root,
  );
}
