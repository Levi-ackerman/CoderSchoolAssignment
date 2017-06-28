import { get } from '../Lib/AsyncStorageUtils';
import { requestUserTokenSuccess } from '../Login/Action';

import {
  REQUEST_YELP_TOKEN,
  REQUEST_YELP_TOKEN_SUCCESS,
  REQUEST_YELP_TOKEN_ERROR,
} from './ActionType';

const params = {
  client_id: 'VDYSOtauXSk9pt2AgnEKCQ', // use your own
  client_secret: 'JaZadT3ZHNY9N9zTBPK5CrD1NY8aU7srSKGjeK2k5iUad2r0hDywDPOT431PKySU', // use your own
  grant_type: 'client_credentials'
};

const requestToken = () => ({
  type: REQUEST_YELP_TOKEN,
});

const requestYelpTokenSuccess = (data) => ({
  type: REQUEST_YELP_TOKEN_SUCCESS,
  data
});

const requestYelpTokenError = (error) => ({
  type: REQUEST_YELP_TOKEN_ERROR,
  error,
});

const requestUserTokenError = (error) => ({
  type: REQUEST_USER_TOKEN_ERROR,
  error,
});

const requestYelpToken = () => (dispatch) => {
  fetch('https://api.yelp.com/oauth2/token',{
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }),
    body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
  })
    .then((response) => {
      setTimeout(() => null, 0);
      return response.json();
    })
    .then((responseJson) => {
      //alert('requestYelpToken', JSON.stringify(responseJson));
      console.log('[Action.js] requestYelpToken success', responseJson);
      dispatch(requestYelpTokenSuccess(responseJson));
    })
    .catch((error) => console.log('[Action.js] requestYelpToken error', error));

};

const requestUserToken = () => (dispatch) => {
  get('USER_INFO')
    .then((response) => {
        dispatch(requestUserTokenSuccess(response));
    })
    .catch((error) => console.log('[Action.js] requestUserToken error', error));
};

export {
  requestYelpToken,
  requestUserToken,
}