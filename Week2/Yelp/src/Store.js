import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { loadYelpData, resetBusiness } from './Home/Action';

// All redux reducers (rolled into one mega-reducer)
import RootReducer from './RootReducer';

// Load middleware
let middleware = [
  // Analytics,
  thunk, // Allows action creators to return functions (not just plain objects)
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    createLogger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(RootReducer);

let prevState
store.subscribe(() => {
  let state = store.getState();

  if (prevState && state.meta && prevState.meta && state.meta !== prevState.meta) {
    console.log('[Store.js] store change');
    let token = state.global.yelpToken.access_token;
    let currentPage = state.businesses.paginations.currentPage;
    let meta = state.meta;
    prevState = state;
    store.dispatch(resetBusiness());
    store.dispatch(loadYelpData(token, currentPage, meta));
  }
  prevState = state;
});

//configureAxios(store);

export default store;