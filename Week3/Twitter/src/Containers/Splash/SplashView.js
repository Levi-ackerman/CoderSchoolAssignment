import React, {Component} from 'react';
import { Image, StyleSheet } from 'react-native';
import { get, clear } from '../../Utils/AsyncStorageUtils';
import { navigateTo } from '../../Utils/NavigationUtils';

export default class SplashView extends Component {

  componentDidMount = () => {
    const { navigation, loginSuccess, getUserInfo } = this.props;

     // clear()
     //   .then(() => {

        setTimeout(() => {
          get('USER_TOKEN')
            .then((response) => {
              if(response){
                const responseJson = JSON.parse(response);
                loginSuccess(responseJson);
                getUserInfo(responseJson);
              }else {
                navigateTo('Login', navigation);
              }
            })
            .catch(() => {
              navigateTo('Login', navigation);
            });
        }, 2000);



       // })
       // .catch(error => console.log('[clear store error] ', error));
  };

  componentWillReceiveProps = (nextProps) => {
    const { navigation, loggedIn} = nextProps;
    if (loggedIn) {
      navigateTo('Main',navigation);
    }else{
      navigateTo('Login',navigation);
    }
  };

  render() {
    return (
      <Image
        source={require('../../Images/splash_bg.jpg')}
        style={styles.container}>

      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
});
