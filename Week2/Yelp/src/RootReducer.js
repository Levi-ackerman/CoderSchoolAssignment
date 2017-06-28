import { combineReducers } from 'redux';

import NavigatorStateReducer from './Navigator/NavigatorState';
//global reducer
import yelpToken from './Splash/Reducer';
import { user, loading} from './Login/Reducer';

import businesses from './Home/Reducer';
import setting from './Setting/Reducer';
import meta from './Home/MetaReducer';


const globalReducer = combineReducers({
  yelpToken,
  user,
  loading,
});

// Combine all
const appReducer = combineReducers({
  navigatorState: NavigatorStateReducer,
  global: globalReducer,
  businesses,
  options: setting,
  meta,
});

// Setup root reducer
const RootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default RootReducer;