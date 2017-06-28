import {connect} from 'react-redux';

import { loadYelpData, searchTerm, resetBusiness } from './Action';

import HomeView from './HomeView';

// What data from the store shall we send to the component?
const mapStateToProps = (state) => {
  const {entities, paginations} = state.businesses;

  let data = [];
  for (let key in entities) {
    if (entities.hasOwnProperty(key)) {
      data.push(entities[key]);
    }
  }

  return {
    token: state.global.yelpToken.access_token,
    data,
    paginations,
    meta: state.meta,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = {
  loadYelpData,
  searchTerm,
  resetBusiness,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);