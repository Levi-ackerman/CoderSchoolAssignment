// import {GraphRequest, LoginManager, AccessToken, GraphRequestManager} from 'react-native-fbsdk';
import {REQUEST_USER_TOKEN_SUCCESS, GLOBAL_LOADING} from './ActionType';
import {set} from '../Lib/AsyncStorageUtils';
import { Facebook } from 'expo';

const requestUserTokenSuccess = (data) => ({
  type: REQUEST_USER_TOKEN_SUCCESS,
  data,
});

const showHideLoading = (loading) => ({
  type: GLOBAL_LOADING,
  loading,
});

const loginWithFacebook = () => (dispatch) => {
  const appId = '238771403279310';

  Facebook.logInWithReadPermissionsAsync(appId, {
    permissions: ['public_profile'],
  })
    .then((response) => {
        console.log('[Action.js] facebook success ', response);
        if(response.type === 'success'){
          const token = response.token;
          set('USER_INFO', token);
          fetch(`https://graph.facebook.com/me?access_token=${token}`)
            .then(response => response.json())
            .then(responseJson => {
              console.log('[Action.js] get user info', response);
              // alert(`get user info success ${JSON.stringify(responseJson)}`);
              set('USER_INFO', JSON.stringify(responseJson));
              dispatch(requestUserTokenSuccess(responseJson))
            })
            .catch(error => {
              alert(`get user info error ${JSON.stringify(error)}`);
            })
        }
    })
    .catch((error) => console.log('[Action.js] facebook error', error))

};

export {
  loginWithFacebook,
  requestUserTokenSuccess,
}

/*
{
  "expires": 1503984058,
  "token": "EAADZAKUysy84BAC6uZBNeLWGieV5lU9IMeanYDgNlKkm8zgcSazfrH9fHEpF9pUWFfOyeqoLhc6MVOHT7AUgCXv6YwEDWAsQSkaLMuVlAZBNSAc7YpijI1bC9nvsW0ZCvNvKsocyddt6x6wl1LE9xI2Ik6viwSBTZA6jUxxZASVO0S2yZB7dHx2i8MPo4Dhh56z0q5mNZAxhWwZDZD",
  "type": "success",
}*/
