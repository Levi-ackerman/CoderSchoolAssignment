import React from 'react';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import NavigatorViewContainer from './src/Navigator/NavigatorViewContainer';
import store from './src/Redux/Store';


export default class App extends React.Component {

  componentDidMount() {
    Font.loadAsync({
      'Roboto_medium': require('./src/Assets/Roboto-Medium.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <NavigatorViewContainer />
      </Provider>
    );
  }
}
