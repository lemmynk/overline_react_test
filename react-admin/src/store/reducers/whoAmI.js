import { SET_WHO_AM_I, CLEAR_WHO_AM_I } from '../actions';

const whoAmI = (state = {}, action) => {
  switch (action.type) {
    case SET_WHO_AM_I:
      return action.payload;
    case CLEAR_WHO_AM_I:
      return {};
    default:
      return state;
  }
};

export default whoAmI;
