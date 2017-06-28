import {
  REQUEST_USER_TOKEN_SUCCESS,
  GLOBAL_LOADING
} from './ActionType';

const user = (state = {}, action) => {
  switch (action.type){
    case REQUEST_USER_TOKEN_SUCCESS:
      return action.data;
    default: return state;
  }
};

const loading = (state = false, action ) => {
  if(action.type === GLOBAL_LOADING){
    return action.loading;
  }
  return state;
};

export {
  user,
  loading,
};