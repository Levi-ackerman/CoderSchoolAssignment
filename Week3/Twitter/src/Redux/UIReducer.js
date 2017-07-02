export const LOGIN_LOADING = 'LOGIN_LOADING';

const initialState = {
  login: false,
};

const ui = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case LOGIN_LOADING:
      return {
        ...state,
        login: payload,
      };
    default: return state;
  }
};

export {
  ui
};