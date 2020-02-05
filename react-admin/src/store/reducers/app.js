import { combineReducers } from 'redux';
import {
  // DO_UPDATE_APP_CONFIG,
  SET_APP_REDIRECT_URL,
  // SET_APP_CONFIG,
  // SET_APP_CONFIG_VERISON,
} from '../actions';

const redirectUrl = (state = '/', action) =>
  action.type === SET_APP_REDIRECT_URL ? action.payload : state;

// const config = (state = {}, action) => {
//   switch (action.type) {
//     case SET_APP_CONFIG:
//       return { ...state, ...action.payload };
//     case DO_UPDATE_APP_CONFIG: {
//       const { key, data } = action.payload;
//       const newState = { ...state[key], ...data };
//       return { ...state, [key]: newState };
//     }
//     default:
//       return state;
//   }
// };

// const configVersion = (state = 0, action) =>
//   action.type === SET_APP_CONFIG_VERISON ? parseInt(action.payload, 10) : state;

export default combineReducers({
  redirectUrl,
  // config,
  // configVersion,
});
