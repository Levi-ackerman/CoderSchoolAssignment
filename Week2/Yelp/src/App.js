/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

import NavigatorViewContainer from './Navigator/NavigatorViewContainer';


export default class Yelp extends Component {

  render() {
    return (
      <Provider store={Store}>
        <NavigatorViewContainer />
      </Provider>
    );
  }
}