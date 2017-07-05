import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import LoginScreen from '../Containers/Login/LoginContainer';
import SplashScreen from '../Containers/Splash/SplashContainer';
import HomeScreen from '../Containers/Home/HomeContainer';
import ReplyScreen from '../Containers/Reply/ReplyContainer';

import Drawer from '../Components/Drawer';
import MenuButton from '../Components/MenuButton';
import { MENU_TYPE_HOME, MENU_TYPE_TIME_LINE } from '../Utils/Constants';


import {AppColors} from '../Styles/index';

const drawerNavigationOptions = ({screenProps, navigation}) => {
  return {
    headerStyle: {
      backgroundColor: '#138BF2',
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
    screen: ({ navigation }) => <HomeScreen navigation={navigation} screenProps={{type : MENU_TYPE_HOME}} />,
    navigationOptions: {
      title: 'Home',
    }
  }
}, {
  navigationOptions: drawerNavigationOptions,
});

const TimeLineNav = StackNavigator({
  TimeLineNav: {
    screen: ({ navigation }) => <HomeScreen navigation={navigation} screenProps={{type : MENU_TYPE_TIME_LINE}} />,
    navigationOptions: {
      title: 'TimeLine',
    }
  }
}, {
  navigationOptions: drawerNavigationOptions,
});

const MainScreenNavigator = DrawerNavigator({
  Home: {
    screen: HomeNav,
  },
  TimeLine: {
    screen: TimeLineNav,
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
  Reply: {
    screen: ReplyScreen
  },
}, {
  headerMode: 'none',
});


export default AppNavigator;
