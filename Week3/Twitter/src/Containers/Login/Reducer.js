import {
  UPDATE_TOKEN,
  UPDATE_USER_INFO,
  LOGOUT,
} from './ActionType';

const token = (state = {}, action) => {
  const { type, payload } = action;
  switch (type){
    case UPDATE_TOKEN:
      return payload;
    default: return state;
  }
};

const user = (state = { loggedIn: false }, action) => {
  const { type, payload } = action;
  switch (type){
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...payload,
      };
    case LOGOUT:
      return {
        loggedIn: false,
      };
    default: return state;
  }
};

export {
  token,
  user,
}