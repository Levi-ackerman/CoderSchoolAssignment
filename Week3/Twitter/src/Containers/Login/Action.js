import {
  UPDATE_TOKEN,
  UPDATE_USER_INFO,
} from './ActionType';
import { KEY } from '../../Utils/Constants';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';

const updateToken = (payload) => ({
  type: UPDATE_TOKEN,
  payload,
});

const updateUserInfo = (payload) => ({
  type: UPDATE_USER_INFO,
  payload,
});

const getUserInfo = (token) => (dispatch) => {

  const url = 'https://api.twitter.com/1.1/users/show.json';
  const params = {
    user_id: token.user_id,
    screen_name: token.screen_name
  };
  const headers = getHeaders(url, params, {}, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
  'get', token.oauthToken, token.oauthTokenSecret);

  fetch(`${url}?user_id=${token.user_id}&screen_name=${token.screen_name}`, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(response => {
      const user = {
        loggedIn: true,
        id: response.id,
        name: response.name,
        screen_name: response.screen_name,
        url: response.url,
        profileImageUrl: response.profile_image_url,
        profileBannerUrl: response.profile_banner_url,
      };
      dispatch(updateUserInfo(user));
    })
    .catch(error => {
      console.log('[Action.js] user info error', error);
      dispatch(updateUserInfo({loggedIn: false}));
    })
};

export {
  updateToken,
  updateUserInfo,
  getUserInfo,
}
