import {
  LOAD_HOME_TIME_LINE,
  LOAD_USER_TIME_LINE,
} from './ActionType';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';
import { KEY } from '../../Utils/Constants';
import { set , get } from '../../Utils/AsyncStorageUtils';

export const loadHomeTimeLineSuccess = (payload) => ({
  type: LOAD_HOME_TIME_LINE,
  payload,
});

export const loadUserTimeLineSuccess = (payload) => ({
  type: LOAD_USER_TIME_LINE,
  payload,
});

export const getHomeTimeLineFeed = (token) => (dispatch) => {
  const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
  const params = {
    count: 10,
  };
  const headers = getHeaders(url, params, {}, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'get', token.oauth_token, token.oauth_token_secret);

 /*
    get('HOME_TIME_LINE')
    .then(response => {
      if(response){
        console.log('[--------------------LOAD FROM CACHE----------------------------------------------] ');
        dispatch(loadHomeTimeLineSuccess(JSON.parse(response)));
      }else {
        console.log('[--------------------CAL API TO GET DATA----------------------------------------------] ');
        fetch(`${url}?count=${params.count}`, {
          method: 'get',
          headers,
        })
          .then(res => res.json())
          .then(response => {
            console.log('[Action.js] getHomeTimeLineFeed success', response.length);

            set('HOME_TIME_LINE', JSON.stringify(response));

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
      dispatch(loadHomeTimeLineSuccess(response));
    })
    .catch(error => {
      console.log('[Action.js] getHomeTimeLineFeed error', error);
    })

};

export const getUserTimeLineFeed = (token) => (dispatch) => {

  const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  const params = {
    count: 10,
  };
  const headers = getHeaders(url, params, {}, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'get', token.oauth_token, token.oauth_token_secret);

  /*get('USER_TIME_LINE')
   .then(response => {
   if(response){
   console.log('[--------------------LOAD FROM CACHE----------------------------------------------] ');
   dispatch(loadHomeTimeLineSuccess(JSON.parse(response)));
   }else {
   console.log('[--------------------CAL API TO GET DATA----------------------------------------------] ');
   fetch(`${url}?count=${params.count}`, {
   method: 'get',
   headers,
   })
   .then(res => res.json())
   .then(response => {
   console.log('[Action.js] getHomeTimeLineFeed success', response.length);

   set('USER_TIME_LINE', JSON.stringify(response));

   dispatch(loadUserTimeLineSuccess(response));
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
      dispatch(loadUserTimeLineSuccess(response));
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
  const headers = getHeaders(url, params, params, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'post', token.oauth_token, token.oauth_token_secret);

  fetch(`${url}?id=${params.id}`, {
    method: 'post',
    headers,
    data: params
  })
    .then(res => res.json())
    .then(response => {
      if(response.id){
        dispatch(getHomeTimeLineFeed(token));
      }
    })
    .catch(error => {
      console.log('[Action.js] requestLikePost error', error);
    })
};