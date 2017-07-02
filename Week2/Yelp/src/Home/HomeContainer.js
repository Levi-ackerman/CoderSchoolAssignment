import {connect} from 'react-redux';

import { loadYelpData, searchTerm, resetBusiness } from './Action';

import HomeView from './HomeView';

import { getKey } from '../Lib/Utils';

// What data from the store shall we send to the component?
const mapStateToProps = (state) => {
  const {entities, paginations } = state.businesses;
  const meta  = state.meta;


  let data = [];
  // let key = getKey(meta);
  let _fetching = false;
  let _offset = -1;

  if(paginations.key && paginations.pages.hasOwnProperty(paginations.key)){
    const { ids, fetching, offset  } = state.businesses.paginations.pages[paginations.key];
    _fetching = fetching;
    _offset = offset;

    for (let id in ids) {
      if (entities.hasOwnProperty(ids[id])) {
        data.push(entities[ids[id]]);
      }
    }
  }


  return {
    token: state.global.yelpToken.access_token,
    data,
    meta,
    fetching: _fetching,
    offset: _offset,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = {
  loadYelpData,
  searchTerm,
  resetBusiness,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);