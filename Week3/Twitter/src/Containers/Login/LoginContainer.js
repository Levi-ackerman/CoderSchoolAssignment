import { connect } from 'react-redux';
import { updateToken, updateUserInfo, getUserInfo } from './Action';

import LoginView from './LoginView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return state.user;
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  updateToken: (data) => dispatch(updateToken(data)),
  getUserInfo: (token) => dispatch(getUserInfo(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);