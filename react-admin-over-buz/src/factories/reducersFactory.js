import { combineReducers } from 'redux';
import { appNamespace } from '../config';
// import libReducers from '../store/reducers';

const libReducers = {};

const combineAllReducers = (appReducers = {}) => {
  const allReducers = libReducers;

  Object.keys(appReducers).forEach(key => {
    const reducer = appReducers[key];
    allReducers[`${appNamespace}/${key}`] = reducer;
  });

  return allReducers;
};

const allReducers = (appReducers = {}) =>
  combineReducers(combineAllReducers(appReducers));

export default allReducers;
