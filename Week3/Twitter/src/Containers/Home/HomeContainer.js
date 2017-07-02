import { connect } from 'react-redux';
import { getHomeTimeLineFeed, requestLikePost } from './Action';

import HomeView from './HomeView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    data: state.home,
  };
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  getHomeTimeLineFeed : (token) => dispatch(getHomeTimeLineFeed(token)),
  requestLikePost : (id, favorited, token) => dispatch(requestLikePost(id, favorited, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);