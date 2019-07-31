// @flow
// https://github.com/zalmoxisus/redux-devtools-extension#usage
// https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
// import { reduxState } from '../config';
import reducersFactory from './reducersFactory';
import sagasFactory from './sagasFactory';
import reduxDevToolsEnhancer from './reduxDevToolsEnhancer';

const storeFactory = (props: StoreFactoryProps) => {
  // const { ERRORS } = reduxState;
  const { appBlacklist, appReducers, appSagas, purgeStore } = props;

  // let blacklist = [ERRORS];
  let blacklist = [];
  if (appBlacklist) {
    blacklist = [...blacklist, ...appBlacklist];
  }

  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist,
  };

  const allReducers = reducersFactory(appReducers || {});
  const pReducer = persistReducer(persistConfig, allReducers);

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = reduxDevToolsEnhancer || compose;

  const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk, ReduxPromise)),
  );

  const rootSaga = sagasFactory(appSagas || []);
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);
  if (purgeStore) {
    persistor.purge();
  }

  return { store, persistor };
};

export default storeFactory;
