import {connect} from 'react-redux';


import SettingView from './SettingView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  meta: state.meta,
  editSetting: state.editSetting,
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps)(SettingView);