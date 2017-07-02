import React from 'react';
import  { Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

import {AppColors} from '../Styles/index';
//screen
import LoginScreen from '../Login/LoginContainer';
import HomeScreen from '../Home/HomeContainer';
import SplashScreen from '../Splash/SplashContainer';
import SettingScreen from '../Setting/SettingContainer';
import ListOptionsView from '../Setting/ListOptionsView';
import DistanceView from '../Setting/DistanceView';
import CategoryView from '../Setting/CategoryView';
import SortByView from '../Setting/SortByView';

import SearchBar from '../Components/SearchBar';

/*
import LaunchContainer from '../containers/Launch/LaunchContainer';
import Placeholder from '../components/general/Placeholder';
import Error from '../components/general/Error';
import MoviesView from '../containers/Movies/MoviesView';
import TVShowsView from '../containers/TVShows/TVShowsView';
import DiscoverScreen from '../containers/Discover/DiscoverContainer';
import MoviesScreen from '../containers/Movies/MoviesContainer';
import LoginScreen from '../containers/Login/LoginContainer';
import SearchScreen from '../containers/Search/SearchContainer';
import DetailScreen from '../containers/Detail/DetailContainer';

import Drawer from '../components/Drawer';
import DrawerButton from '../components/DrawerButton';
import SearchButton from '../components/SearchButton';


const drawerNavigationOptions = ({screenProps, navigation}) => ({
  headerStyle: {
    backgroundColor: AppColors.colorPrimary,
    shadowColor: AppColors.colorPrimary,
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerLeft: (<DrawerButton navigation={navigation}/>),
  headerRight: (<SearchButton navigation={navigation}/>),
});

const discoverTabRoute = {
  menu: 'discover',
  index: 0,
  routes: [
    {key: '0', id: DISCOVER_MOVIES, itemType: 'movie', title: 'Movies'},
    {key: '1', id: DISCOVER_TVSHOWS, itemType: 'tv', title: 'TVShows'},
  ],
};

const DiscoverNav = StackNavigator({
  DiscoverNav: {
    screen: () => <DiscoverScreen screenProps={discoverTabRoute}/>,
    navigationOptions: {
      title: 'Discover',
    }
  },
}, {
  navigationOptions: drawerNavigationOptions,
});

const moviesTabRoute = {
  menu: 'movies',
  index: 0,
  routes: [
    {key: '0', id: MOVIE_POPULAR, itemType: 'movie', title: 'Popular'},
    {key: '1', id: MOVIE_TOP_RATED, itemType: 'movie', title: 'Top Rated'},
    {key: '2', id: MOVIE_UP_COMING, itemType: 'movie', title: 'Upcoming'},
    {key: '3', id: MOVIE_NOW_PLAYING, itemType: 'movie', title: 'Now playing'},
  ],
};

const MoviesNav = StackNavigator({
  MovieNav: {
    screen: () => <DiscoverScreen screenProps={moviesTabRoute}/>,
    navigationOptions: {
      title: 'Movies',
    }
  },
}, {
  navigationOptions: drawerNavigationOptions
});

const TVShowsNav = StackNavigator({
  TVShowsNav: {
    screen: Error,
    navigationOptions: {
      title: 'TVShows',
    }
  },
}, {
  navigationOptions: drawerNavigationOptions
});

const PeopleNav = StackNavigator({
  PeopleNav: {
    screen: Error,
    navigationOptions: {
      title: 'People',
    }
  },
}, {
  navigationOptions: drawerNavigationOptions
});

const MainScreenNavigator = DrawerNavigator({
  Discover: {
    screen: DiscoverNav,
  },
  Movies: {
    screen: MoviesNav,
  },
  TVShows: {
    screen: TVShowsNav,
  },
  People: {
    screen: PeopleNav,
  },
}, {
  contentComponent: Drawer,
});
*/

const NavigationStyle = ({screenProps, navigation}) => ({
  headerStyle: {
    backgroundColor: AppColors.colorPrimary,
    shadowColor: AppColors.colorPrimary,
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerLeft: null,
  headerRight: null,
});

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SearchBar navigation={navigation} />,
    }),
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Setting',
      headerStyle: {
        backgroundColor: AppColors.colorPrimary,
        shadowColor: AppColors.colorPrimary,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (<Button color={'#FFF'} title="Cancel" onPress={() => navigation.goBack()}/>),
      headerRight: (<Button color={'#FFF'} title="Search" onPress={() => navigation.goBack()}/>),
    })

  },
  ListOptions: {
    screen: ListOptionsView,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: AppColors.colorPrimary,
        shadowColor: AppColors.colorPrimary,
      },
      headerTitleStyle: {
        color: 'white',
      },
    })
  },
  Distance: {
    screen: DistanceView,
    navigationOptions: ({navigation}) => ({
      title: 'Distance',
      headerStyle: {
        backgroundColor: AppColors.colorPrimary,
        shadowColor: AppColors.colorPrimary,
      },
      headerTitleStyle: {
        color: 'white',
      },
    })
  },
  Category: {
    screen: CategoryView,
    navigationOptions: ({navigation}) => ({
      title: 'Category',
      headerStyle: {
        backgroundColor: AppColors.colorPrimary,
        shadowColor: AppColors.colorPrimary,
      },
      headerTitleStyle: {
        color: 'white',
      },
    })
  },
  SortBy: {
    screen: SortByView,
    navigationOptions: ({navigation}) => ({
      title: 'Sort By',
      headerStyle: {
        backgroundColor: AppColors.colorPrimary,
        shadowColor: AppColors.colorPrimary,
      },
      headerTitleStyle: {
        color: 'white',
      },
    })
  },
}, {
  initialRouteName: 'Splash',
  // headerMode: 'none',
});

export default AppNavigator;
