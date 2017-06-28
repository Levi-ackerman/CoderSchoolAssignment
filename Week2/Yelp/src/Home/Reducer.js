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
  switch (action.type) {
    case 'REQUEST_BUSINESS_PAGE':
      return {
        ...pages,
        [action.payload.page]: {
          ids: [],
          fetching: true
        }
      };
    case 'RECEIVE_BUSINESS_PAGE':
      return {
        ...pages,
        [action.payload.page]: {
          ids: action.payload.business.map(item => item.id),
          fetching: false
        }
      };
    case RESET_BUSINESS: return {};
    default:
      return pages
  }
};

const currentPage = (currentPage = 1, action = {}) => {
  switch (action.type){
    case 'REQUEST_BUSINESS_PAGE':
      return action.payload.page;
    case RESET_BUSINESS:
      return 1;
    default: return currentPage;
  }
} ;
   // action.type === 'REQUEST_BUSINESS_PAGE' ? action.payload.page : currentPage;


const entities = (state = {}, action = {}) => {
  switch (action.type) {
    case 'RECEIVE_BUSINESS_PAGE':
      let _entities = {};
      for (let entity of action.payload.business) {
        _entities = {
          ..._entities,
          [entity.id]: entity
        }
      }
      return {
        ...state,
        ..._entities
      };
    case RESET_BUSINESS: return {};
    default:
      return state
  }
};

const paginations = combineReducers({
  pages,
  currentPage
});

export default combineReducers({
  entities,
  paginations
})




//export default businesses;