import AppNavigator from './Navigator';

const initialState =
  AppNavigator.router.getStateForAction
  (AppNavigator.router.getActionForPathAndParams('Splash'));

export default function NavigatorReducer(state = initialState, action) {

  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
