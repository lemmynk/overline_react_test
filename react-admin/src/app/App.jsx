/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppLayout from './Template/AppLayout';
import storeFactory from './storeFactory';
import Router from '../router/Router';
import { renderSidebar, renderHeader, renderFooter } from './Template';

import '@csstools/normalize.css';
import '@newtash/styles/app.scss';

const { store, persistor } = storeFactory();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <AppLayout
          renderSidebar={renderSidebar}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
        >
          <Router />
        </AppLayout>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
