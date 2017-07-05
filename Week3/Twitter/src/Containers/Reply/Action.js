import {
  REPLY,
  REPLY_SUCCESS,
} from './ActionType';
import { KEY } from '../../Utils/Constants';
import { REPLY_TWEET_STATUS } from '../../Redux/UIReducer';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';

const reply = ( payload ) => ({
  type: REPLY,
  payload,
});

const replySuccess = ( payload ) => ({
  type: REPLY_SUCCESS,
  payload,
});

const requestReply = (token, payload) => ( dispatch ) => {

  const url = 'https://api.twitter.com/1.1/statuses/update.json';
  const data = {
    status: encodeURI(payload.status),
    in_reply_to_status_id: payload.target,
  };
  const headers = getHeaders(url, {}, data, KEY.twitterConsumerKey, KEY.twitterConsumerSecret,
    'post', token.oauth_token, token.oauth_token_secret);


  fetch(`${url}?status=${data.status}&in_reply_to_status_id=${data.in_reply_to_status_id}`, {
    method: 'POST',
    headers,
  })
    .then(res => res.json())
    .then(response => {
      if(!response.errors){
        dispatch({
          type: REPLY_TWEET_STATUS,
          payload: 1,//success
        });
      }else {
        dispatch({
          type: REPLY_TWEET_STATUS,
          payload: -1,//success
        });
      }
    })
    .catch(error => {
      console.log('[Action.js] reply error', error);
      dispatch({
        type: REPLY_TWEET_STATUS,
        payload: -1,//failed
      });
    })

};

export {
  reply,
  replySuccess,
  requestReply,
}