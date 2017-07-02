import { combineReducers } from 'redux';
import {
  LOAD_DATA,
  LOAD_MORE,
  LOAD_DATA_SUCCESS,
  SEARCH_TERM,
  RESET_BUSINESS,
} from './ActionType';

const initialState = {
  loading: false,
  loadMore: false,
  currentPage: 1,
  options: {
    term: '',
    categories: [],
    openNow: false,
    location: 'San Francisco',
  },
  items: [],
};

const businesses = (state = initialState, action) => {
  switch (action.type){
    case LOAD_DATA:
      return {
        ...state,
        loading: true,
        loadMore: false,
        currentPage: action.page,
      };
    case LOAD_MORE:
      return {
        ...state,
        loading: false,
        loadMore: true,
        currentPage: action.page,
      };
    case SEARCH_TERM:
      return {
        ...state,
        options: {
          ...state.options,
          term: action.term,
        }
      };
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loadMore: false,
        items: (action.loadMore) ? [...state.items, ...action.data] : action.data,
      };

    default:
      return state;
  }
};


const pages = (pages = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'REQUEST_BUSINESS_PAGE':
      return {
        ...pages,
        [payload.key]: {
          ids: pages[payload.key] ? pages[payload.key].ids : [],
          fetching: true,
          offset: payload.offset,
        }
      };
    case 'RECEIVE_BUSINESS_PAGE':
      let ids = [
        ...pages[payload.key].ids,
        ...payload.data.map(item => item.id)
      ];
      let x = {
        ...pages,
        [payload.key]: {
          ...pages[payload.key],
          ids,
          fetching: false,
        }
      };
      return x;
    case RESET_BUSINESS: return {};
    default:
      return pages
  }
};

const key = (key = '', action = {}) => {
  switch (action.type){
    case 'REQUEST_BUSINESS_PAGE':
      return action.payload.key;
    default:
      return key;
  }
} ;

const entities = (state = {}, action = {}) => {
  switch (action.type) {
    case 'RECEIVE_BUSINESS_PAGE':
      let _entities = {};
      for (let entity of action.payload.data) {
        _entities = {
          ..._entities,
          [entity.id]: entity
        }
      }
      return {
        ...state,
        ..._entities
      };
    default:
      return state
  }
};

const paginations = combineReducers({
  pages,
  key,
});

export default combineReducers({
  entities,
  paginations
})




//export default businesses;