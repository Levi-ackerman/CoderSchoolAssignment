import { combineReducers } from 'redux';

import Nav from '../Navigator/NavigatorState';
import { token, user } from '../Containers/Login/Reducer';
import { ui } from '../Redux/UIReducer';
import { home } from '../Containers/Home/Reducer';

// Combine all
const appReducer = combineReducers({
  nav: Nav,
  token,
  user,
  ui,
  home,
});

// Setup root reducer
const rootReducer = (state, action) => {
  //console.log('[RootReducer.js] rootReducer --->', action);
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;