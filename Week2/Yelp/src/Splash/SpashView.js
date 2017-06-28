import React, {Component, PropTypes} from 'react';
import {
  View,
  Image,
} from 'react-native';

import { navigateTo } from '../Lib/NavigationUtils';

// Consts and Libs
import { AppStyles } from '../Styles/index';

/* Component ==================================================================== */
class SplashView extends Component {

  static propTypes = {
    requestYelpToken: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      navigated: false,
    };
  }

  componentDidMount = () => {
    const {requestYelpToken, requestUserToken} = this.props;
    setTimeout(() => {
      requestYelpToken();
      //requestUserToken();
    }, 1500);
  };

  componentWillReceiveProps = (nextProps) => {
    const { yelpToken } = nextProps;
    if (yelpToken) {
       navigateTo('Home', this.props.navigation);
    }else{
      navigateTo('Login', this.props.navigation);
    }
  };


  render = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, backgroundColor: '#d0ecfb',}}>
        </View>
        <View style={{flex: 1, backgroundColor: '#FFF',}}>
        </View>

        <View
          style={{
            position: 'absolute',
            flexDirection: 'column',
            alignItems: 'center',
            top: 0, right: 0, bottom: 0, left: 0,
            paddingTop: 80,
            paddingBottom: 80,
            paddingHorizontal: 40,
          }}
        >
          <Image
            style={{width: 320, height: 160}}
            resizeMode="contain"
            source={require('../Images/logo.png')}
          />

          <Image
            style={{width: 320}}
            resizeMode="contain"
            source={require('../Images/login.png')}
          />

        </View>

      </View>
    );
  };
}

/* Export Component ==================================================================== */
export default SplashView;
