import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  View,
  Image,
} from 'react-native';

//component
import Input from '../Components/Input';
import RoundButton from '../Components/RoundButton';
import Loading from '../Components/Loading';
//lib and constants
import { AppColors } from '../Styles/index';
import { navigateTo } from '../Lib/NavigationUtils';


export default class LoginView extends Component {

  constructor(){
    super();

    this.state = {
      email: {
        value: 'admin@yahoo.com',
        error: false,
      },
      password: {
        value: '123456',
        error: false,
      },
      focusPassword: false,
    }

  }

  loginWithEmailAndPassword = () => {
    const { navigation : { navigate }} = this.props;
    navigate('Home');
  };

  loginWithFacebook = () => {
    const { loginWithFacebook } = this.props;
    loginWithFacebook();
  };

  componentWillReceiveProps = (nextProps) => {
    const { user, loading } = nextProps;
    if (user && !loading) {
      navigateTo('Home', this.props.navigation);
    }
  };


  render() {
    console.log('[LoginView.js] render', this.props);
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="stretch"
          source={require('../Images/login.png')} />

        <Input
          value={this.state.email.value}
          placeholder="Email"
          error={this.state.email.error}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          onChangeText={(emailValue) =>{
            let email = {
              value: emailValue,
              error: false,
            };
            this.setState({email});
          }}
          onSubmitEditing={() => {
            this.setState({focusPassword: true});
          }}
        />

        <Input
          value={this.state.password.value}
          placeholder="Password"
          error={this.state.password.error}
          focus={this.state.focusPassword}
          secureTextEntry
          keyboardType={'default'}
          returnKeyType={'done'}
          onChangeText={(passwordValue) =>{
            let password = {
              value: passwordValue,
              error: false,
            };
            this.setState({password});
          }}
          reference={'PasswordInput'}
        />

        <RoundButton
          text="Login"
          onPress={this.loginWithEmailAndPassword}
          rippleColor={'#584C75'}
          buttonStyle={styles.buttonLogin}
          textButtonStyle={styles.buttonTextLogin} />

        <RoundButton
          text="Login With Facebook"
          onPress={this.loginWithFacebook}
          rippleColor={'#584C75'}
          buttonStyle={styles.facebookLogin}
          textButtonStyle={styles.textFacebookLogin} />

        <Loading animating={loading} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 40,
  },
  buttonLogin: {
    width: null,
    height: 40,
    marginTop: 64,
    backgroundColor: AppColors.colorSecondaryText,
  },
  buttonTextLogin: {
    color: '#FFF',
    fontSize: 20,
  },
  facebookLogin: {
    width: null,
    height: 40,
    borderWidth: 1.5,
    borderColor: AppColors.colorPrimary,
    marginTop: 32,
  },
  textFacebookLogin: {
    color: AppColors.colorPrimary,
    fontSize: 20,
  },
});