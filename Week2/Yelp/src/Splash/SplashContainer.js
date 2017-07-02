import {connect} from 'react-redux';

import {requestYelpToken, requestUserToken} from './Action';

import SpashView from './SpashView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return state.global;
};

// Any actions to map to the component?
const mapDispatchToProps = {
  requestYelpToken,
  requestUserToken
};

export default connect(mapStateToProps, mapDispatchToProps)(SpashView);