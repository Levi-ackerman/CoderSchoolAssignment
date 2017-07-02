import React, {Component} from 'react';
import {Linking} from 'react-native';
import {
  Button,
  Container,
  Text,
  Icon,
} from 'native-base';
import {WebBrowser} from 'expo';
import { navigateTo } from '../../Utils/NavigationUtils';
import {set} from '../../Utils/AsyncStorageUtils';
import {requestUrl, parseFormEncoding, getAccessToken} from '../../Utils/TwitterUtils';

let authToken;
let secretToken;

export default class LoginView extends Component {

  componentDidMount() {
    Linking.addEventListener('url', this._handleTwitterRedirect);
  }

  componentWillReceiveProps = (nextProps) => {
    const { navigation, loggedIn} = nextProps;
    if (loggedIn) {
      navigateTo('Main',navigation);
    }else{
      navigateTo('Login',navigation);
    }
  };


  _handleTwitterRedirect = (event) => {
    console.log('[LoginView.js] event', event);
    if (!event.url.includes('+/redirect')) {
      return;
    }
    // Parse the response query string into an object.
    const [, queryString] = event.url.split('?');
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=');
      map[key] = value; // eslint-disable-line
      return map;
    }, {});

    const verifier = responseObj.oauth_verifier;

    getAccessToken(verifier, authToken, secretToken)
      .then(response => {
        console.log('[_handleTwitterRedirect.js]  redirect twitter', response);
        const accessTokenResponse = parseFormEncoding(response);

        set('USER_TOKEN', JSON.stringify(accessTokenResponse))
          .then(() => console.log('[LoginView.js] save token to storage success'))
          .catch(() => console.log('[LoginView.js] save token to storage error'));

        this.props.updateToken(accessTokenResponse);
        this.props.getUserInfo(accessTokenResponse);
      })
      .catch((error) => {
        console.log('[_handleTwitterRedirect.js] redirect twitter error', error)
      });

    WebBrowser.dismissBrowser();
  };

  onPress = () => {
    requestUrl()
      .then((response) => {
        console.log('[LoginView.js]vv success', response);
        const tokenResponse = parseFormEncoding(response);
        authToken = tokenResponse.oauth_token;
        secretToken = tokenResponse.oauth_token_secret;
        // Token Authorization, send the URL to the native app to then display in 'Webview'
        const authURL = 'https://api.twitter.com/oauth/authorize?oauth_token=' + authToken;

        WebBrowser.openBrowserAsync(authURL)
          .then(response => {
            console.log('[LoginView.js]  redirect twitter', response);
          })
          .catch((error) => console.log('[LoginView.js] redirect twitter error', error))

      })
      .catch(error => console.log('[LoginView.js]vv error', error));
  };

  render() {
    console.log('[LoginView.js] render', this.props);
    return (
      <Container style={styles.container}>
        <Button iconLeft onPress={this.onPress}>
          <Icon ios='logo-twitter' android="logo-twitter"
                style={{fontSize: 24, color: 'blue'}}/>
          <Text>Login With Twitter</Text>
        </Button>
      </Container>
    );
  }
}

const styles = {
  container: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
};
