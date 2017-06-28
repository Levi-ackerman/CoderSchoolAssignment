import {connect} from 'react-redux';

import { loginWithFacebook } from './Action';

import LoginView from './LoginView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    loading : state.global.loading,
    user : state.global.user,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = {
  loginWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);