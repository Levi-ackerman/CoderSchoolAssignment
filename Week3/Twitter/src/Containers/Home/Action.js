import {
  LOAD_HOME_TIME_LINE,
} from './ActionType';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';
import { KEY } from '../../Utils/Constants';
import { set , get } from '../../Utils/AsyncStorageUtils';

export const loadHomeTimeLineSuccess = (payload) => ({
  type: LOAD_HOME_TIME_LINE,
  payload,
});

export const getHomeTimeLineFeed = (token) => (dispatch) => {
  const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
  const params = {
    count: 10,
  };
  console.log('[Action.js] yyyyyyyy', token);
  const headers = getHeaders(url, params, {}, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'get', token.oauth_token, token.oauth_token_secret);

  console.log('[Action.js] xxxxxxxxx', headers);


  /*get('TIME_LINE')
    .then(response => {

      if(response){
        console.log('[--------------------LOAD FROM CACHE----------------------------------------------] ');
        dispatch(loadHomeTimeLineSuccess(JSON.parse(response)));
      }else {
        fetch(`${url}?count=${params.count}`, {
          method: 'get',
          headers,
        })
          .then(res => res.json())
          .then(response => {
            console.log('[Action.js] getHomeTimeLineFeed success', response.length);

            set('TIME_LINE', JSON.stringify(response));

            dispatch(loadHomeTimeLineSuccess(response));
          })
          .catch(error => {
            console.log('[Action.js] getHomeTimeLineFeed error', error);
          })
      }
    })*/


  fetch(`${url}?count=${params.count}`, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(response => {
      console.log('[Action.js] getHomeTimeLineFeed success', response.length);

      //set('TIME_LINE', JSON.stringify(response));

      dispatch(loadHomeTimeLineSuccess(response));
    })
    .catch(error => {
      console.log('[Action.js] getHomeTimeLineFeed error', error);
    })

};

export const requestLikePost = (id, favorited, token) => (dispatch) => {
  const url = `https://api.twitter.com/1.1/favorites/${!favorited ? 'create.json' : 'destroy.json'}`;
  const params = {
    id,
  };
  console.log('[Action.js] yyyyyyyy', token);
  const headers = getHeaders(url, params, params, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'post', token.oauth_token, token.oauth_token_secret);

  console.log('[Action.js] xxxxxxxxx', url);

  fetch(`${url}?id=${params.id}`, {
    method: 'post',
    headers,
    data: params
  })
    .then(res => res.json())
    .then(response => {
      console.log('[Action.js] requestLikePost success');
      if(response.id){
        dispatch(getHomeTimeLineFeed(token));
      }
    })
    .catch(error => {
      console.log('[Action.js] requestLikePost error', error);
    })
};