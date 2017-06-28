import {connect} from 'react-redux';


import SettingView from './SettingView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return state.options;
};

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps)(SettingView);