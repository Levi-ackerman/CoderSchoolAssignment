import { connect } from 'react-redux';
import { updateToken, getUserInfo } from '../Login/Action';
import { requestReply } from './Action';
import ReplyView from './ReplyView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    replyStatus: state.ui.replyStatus,
  };
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  requestReply: (token, payload ) => dispatch(requestReply(token, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplyView);