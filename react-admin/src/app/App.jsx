/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@newtash/core';
// import AppLayout from '@newtash/core/AppLayout';
import AppLayout from './AppLayout';
// import Router from '../router/Router';
import { renderSidebar, renderHeader, renderFooter } from './Template';
import decoder from '../utils/decoder';

import '@csstools/normalize.css';
import '@newtash/styles/app.scss';

const App = () => (
  <BrowserRouter>
    <AppProvider decoder={decoder}>
      <AppLayout
        renderSidebar={renderSidebar}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      >
        <div>...</div>
      </AppLayout>
    </AppProvider>
  </BrowserRouter>
);

export default App;
