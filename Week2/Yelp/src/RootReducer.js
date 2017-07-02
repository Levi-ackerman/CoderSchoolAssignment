import { combineReducers } from 'redux';

import NavigatorStateReducer from './Navigator/NavigatorState';
//global reducer
import yelpToken from './Splash/Reducer';
import { user, loading} from './Login/Reducer';

import businesses from './Home/Reducer';
import { editSetting } from './Setting/Reducer';
import meta from './Home/MetaReducer';
import ui from './Home/UIReducer';


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
  editSetting,
  meta,
  ui,
});

// Setup root reducer
const RootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default RootReducer;