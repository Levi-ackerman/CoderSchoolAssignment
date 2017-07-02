import { connect } from 'react-redux';
import { updateToken, getUserInfo } from '../Login/Action';

import SplashView from './SplashView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return state.user;
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (data) => dispatch(updateToken(data)),
  getUserInfo: (token) => dispatch(getUserInfo(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashView);