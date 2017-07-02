import React from 'react';
import { Provider } from 'react-redux';
import NavigatorViewContainer from './src/Navigator/NavigatorViewContainer';
import store from './src/Redux/Store';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorViewContainer />
      </Provider>
    );
  }
}
