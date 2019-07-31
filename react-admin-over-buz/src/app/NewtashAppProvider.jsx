// @flow
import React from 'react';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components';
// import { storeFactory, themeFactory } from '../factories';
import { themeFactory } from '../factories';
import AppEntry from './AppEntry';

// const { store, persistor } = storeFactory({
//   appBlacklist: [],
//   appReducers: {},
//   appSagas: [],
//   purgeStore: true,
// });

// apiFactory(store);

const theme = themeFactory({});

const handleError = error => {
  // store.dispatch(addAppError(error.message));
  // eslint-disable-next-line no-console
  console.error(error);
};

// DEV ONLY
// if (!isProduction()) {
window.React = React;
// window.store = store;
// }

// handle all of the errors that could appears in the app
window.addEventListener('error', handleError);

const NewtashAppProvider = () => (
  <ThemeProvider theme={theme}>
    <AppEntry />
  </ThemeProvider>
);

export default NewtashAppProvider;
/*

const NewtashAppProvider = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ThemeProvider theme={theme}>
        <AppEntry />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
*/
