import { NavigationActions } from 'react-navigation';

export const navigateTo = (routeName, navigation) => {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})]
  });
  navigation.dispatch(actionToDispatch)
};