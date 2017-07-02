import {
  LOAD_HOME_TIME_LINE,
} from './ActionType';

const home = (state = [], action) => {
  const { type, payload } = action;
  switch (type){
    case LOAD_HOME_TIME_LINE:
      return payload;
    default: return state;
  }
};

export {
  home,
};