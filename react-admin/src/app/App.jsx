/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AuthEntry from './Auth';
import AppLayout from './Template/AppLayout';
import storeFactory from './storeFactory';
import { apiFactory } from '../store/api';
import Router from '../router/Router';
import { renderSidebar, renderHeader, renderFooter } from './Template';

import '@csstools/normalize.css';
import '@newtash/styles/app.scss';

const { store, persistor } = storeFactory();
apiFactory(store);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <AuthEntry>
          <AppLayout
            renderSidebar={renderSidebar}
            renderHeader={renderHeader}
            renderFooter={renderFooter}
          >
            <Router />
          </AppLayout>
        </AuthEntry>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
