import { connect } from 'react-redux';
import { getHomeTimeLineFeed, requestLikePost, getUserTimeLineFeed } from './Action';
import HomeView from './HomeView';
import { MENU_TYPE_HOME } from '../../Utils/Constants';
import { SHOW_USER_DIALOG } from '../../Redux/UIReducer';

// What data from the store shall we send to the component?
const mapStateToProps = ( state, ownProps) => {
  let data;
  const { screenProps : { type }} = ownProps;
  if(type === MENU_TYPE_HOME){
    data = state.home;
  }else {
    data = state.timeline;
  }

  return {
    user: state.user,
    token: state.token,
    data,
    userDialog: state.ui.userDialog,
  };
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  getHomeTimeLineFeed : (token) => dispatch(getHomeTimeLineFeed(token)),
  getUserTimeLineFeed : (token) => dispatch(getUserTimeLineFeed(token)),
  requestLikePost : (id, favorited, token) => dispatch(requestLikePost(id, favorited, token)),
  hideProfilePopup : () => dispatch({ type: SHOW_USER_DIALOG,
    payload: false}),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);