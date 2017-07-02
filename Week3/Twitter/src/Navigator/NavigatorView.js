import React, {PropTypes, Component} from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import { AppColors } from '../Styles/index';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  componentWillMount = () => {

  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor={AppColors.colorPrimaryDark}/>
        <AppNavigator
          navigation={
            addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.navigatorState
            })
          }
        />
      </View>
    );
  }
}

export default NavigatorView;
