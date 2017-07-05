import {
  LOAD_HOME_TIME_LINE,
  LOAD_USER_TIME_LINE,
} from './ActionType';

const home = (state = [], action) => {
  const { type, payload } = action;
  switch (type){
    case LOAD_HOME_TIME_LINE:
      return payload;
    default: return state;
  }
};

const timeline = (state = [], action) => {
  const { type, payload } = action;
  switch (type){
    case LOAD_USER_TIME_LINE:
      return payload;
    default: return state;
  }
};

export {
  home,
  timeline,
};