const LOGIN_LOADING = 'LOGIN_LOADING';
const SHOW_USER_DIALOG = 'SHOW_USER_DIALOG';
const REPLY_TWEET_STATUS = 'REPLY_TWEET_STATUS';

const initialState = {
  login: false,
  userDialog: false,
  replyStatus: 0, //0 default, 1 success, -1 fail
};

const ui = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case LOGIN_LOADING:
      return {
        ...state,
        login: payload,
      };
    case SHOW_USER_DIALOG:
      return {
        ...state,
        userDialog: payload,
      };
    case REPLY_TWEET_STATUS:
      return {
        ...state,
        replyStatus: payload,
      };
    default: return state;
  }
};

export {
  LOGIN_LOADING,
  SHOW_USER_DIALOG,
  REPLY_TWEET_STATUS,
  ui,
};