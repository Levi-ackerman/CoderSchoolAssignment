import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

//scenes
import Home from './Home';
import Detail from './Detail';

import Color from './Colors';

const NavStyle = {
  headerStyle: {
    backgroundColor: Color.primary,
  },
  headerTitleStyle: {
    color: '#FFF',
  }
};

const NowPlayingList = ({navigation})=>
  (<Home navigation={navigation} screenProps={{type: 'now_playing'}} />);

const NowPlayingTab = StackNavigator({
  Home: {
    screen: NowPlayingList,
    navigationOptions: {
      ...NavStyle,
      title: 'Now Playing',
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      ...NavStyle,
      title: 'Detail',
    }
  }
});

const TopRatedList = ({navigation})=> (<Home navigation={navigation} screenProps={{type: 'top_rated'}} />);

const TopRatedTab = StackNavigator({
  Home: {
    screen: TopRatedList,
    navigationOptions: {
      ...NavStyle,
      title: 'Top Rated',
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      ...NavStyle,
      title: 'Detail',
    }
  }
});


export default AppNavigator = TabNavigator({
  NowPlayingTab: {
    screen: NowPlayingTab,
    navigationOptions: {
      tabBarLabel: 'Now Playing',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="play-arrow" color="#FFF" size={30} />
      ),
    }
  },
  TopRatedTab: {
    screen: TopRatedTab,
    navigationOptions: {
      tabBarLabel: 'Top Rated',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="local-play" color="#FFF" size={30} />
      ),
    }
  },
}, {
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#FFF',
    labelStyle: {
      //fontSize: 12,
    },
    tabStyle: {
      //width: 100,
    },
    style: {
      backgroundColor: Color.primary,
    },
  }
});
