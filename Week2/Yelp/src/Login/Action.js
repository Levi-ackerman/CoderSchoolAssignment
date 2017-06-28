// import {GraphRequest, LoginManager, AccessToken, GraphRequestManager} from 'react-native-fbsdk';
import {REQUEST_USER_TOKEN_SUCCESS, GLOBAL_LOADING} from './ActionType';
import {set} from '../Lib/AsyncStorageUtils';

const requestUserTokenSuccess = (data) => ({
  type: REQUEST_USER_TOKEN_SUCCESS,
  data,
});

const showHideLoading = (loading) => ({
  type: GLOBAL_LOADING,
  loading,
});

const loginWithFacebook = () => (dispatch) => {

  /*let token = '';

  const _responseInfoCallback = (error: ?Object, result: ?Object) => {
    if (error) {
      dispatch(showHideLoading(false));
      console.log('Error fetching data: ', error);
    } else {
      console.log('Success fetching data: ', result);
      dispatch(showHideLoading(false));
      let userInfo = {
        id: result.id,
        name: result.name,
        avatarUrl: result.picture.data.url,
        token,
      };
      set('USER_INFO', JSON.stringify(userInfo))
        .then((res) =>
          console.log('[Action.js] save user info to storage success', res))

      ;
      dispatch(requestUserTokenSuccess(userInfo));
    }
  };

  const req = new GraphRequest('/me', {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: {
        'fields': {
          'string': 'email,name,picture'
        }
      }
    },
    _responseInfoCallback,
  );

  LoginManager.logInWithReadPermissions(['public_profile']).then(
    result => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('[Action.js] logInWithReadPermissions success ', result);
        dispatch(showHideLoading(true));
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log('[Action.js] getCurrentAccessToken', data);
            token = data.accessToken;
            new GraphRequestManager().addRequest(req).start();
          }
        );

      }
    },
    error => {
      alert('Login fail with error: ' + error);
    }
  );*/
};

export {
  loginWithFacebook,
  requestUserTokenSuccess,
}