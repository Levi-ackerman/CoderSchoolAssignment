import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
//import store from '../Redux/Store';

import Test1 from '../Components/Test1';
import Test2 from '../Components/Test1';

import HomeView from '../Containers/Home/HomeView';
import LoginScreen from '../Containers/Login/LoginContainer';
import SplashScreen from '../Containers/Splash/SplashContainer';
import HomeScreen from '../Containers/Home/HomeContainer';

import Drawer from '../Components/Drawer';
import MenuButton from '../Components/MenuButton';


import {AppColors} from '../Styles/index';

const drawerNavigationOptions = ({screenProps, navigation}) => {
  return {
    headerStyle: {
      backgroundColor: AppColors.colorPrimary,
      shadowColor: AppColors.colorPrimary,
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: (<MenuButton navigation={navigation}/>),
  }
};

const HomeNav = StackNavigator({
  HomeNav: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    }
  }
}, {
  navigationOptions: drawerNavigationOptions,
});

const MainScreenNavigator = DrawerNavigator({
  Home: {
    screen: HomeNav,
  }
}, {
  contentComponent: Drawer,
});

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainScreenNavigator
  },
}, {
  headerMode: 'none',
});


export default AppNavigator;
