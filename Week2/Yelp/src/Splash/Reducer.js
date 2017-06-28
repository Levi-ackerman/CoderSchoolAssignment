import {
  REQUEST_YELP_TOKEN,
  REQUEST_YELP_TOKEN_SUCCESS,
} from './ActionType';

const yelpToken = (state = {}, action) => {
  switch (action.type){
    case REQUEST_YELP_TOKEN:
      return state;
    case REQUEST_YELP_TOKEN_SUCCESS:
      return action.data;
    default: return state;
  }
};

export default yelpToken;