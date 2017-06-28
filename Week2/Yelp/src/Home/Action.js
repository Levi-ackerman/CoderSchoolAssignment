import {
  LOAD_DATA,
  LOAD_MORE,
  LOAD_DATA_SUCCESS,
  SEARCH_TERM,
  SEARCH_TERM_SUCCESS,
  UPDATE_META,
  RESET_BUSINESS,
} from './ActionType';

export const loadData = (params) => ({
  type: LOAD_DATA,
  params,
});

export const loadMore = (page) => ({
  type: LOAD_MORE,
  page,
});

export const loadDataSuccess = (data, loadMore) => ({
  type: LOAD_DATA_SUCCESS,
  data,
  loadMore,
});

export const searchTerm = (term) => ({
  type: SEARCH_TERM,
  term
});

export const updateMeta = (meta) => ({
  type: UPDATE_META,
  meta
});

export const resetBusiness = () => ({
  type: RESET_BUSINESS,
});


export const requestBusiness = (page, refresh) => ({
  type: 'REQUEST_BUSINESS_PAGE',
  payload: {
    page,
    refresh,
  },
});

export const receiveBusiness = (page, business, refresh) => ({
  type: 'RECEIVE_BUSINESS_PAGE',
  payload: {
    page,
    business,
    refresh,
  },
});

export const loadYelpData = (token, page, meta) => (dispatch) => {
  dispatch(requestBusiness(page));

  let url;
  if(meta){
    url = `https://api.yelp.com/v3/businesses/search?open_now=${meta.openNow}&categories=${meta.categories}&term=${meta.term}&location=${meta.location}&offset=${(page - 1)*20}`
  }else {
    url = `https://api.yelp.com/v3/businesses/search?location=San%20Francisco&offset=${(page - 1)*20}`;
  }

  console.log('[Action.js] loadYelpData ', url);
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      setTimeout(() => null, 0);
      return response.json();
    })
    .then((responseJson) => {
      //error can be occur here
      console.log('loadYelpData success', responseJson);
      //dispatch(loadDataSuccess(responseJson.businesses, isLoadMore));
      dispatch(receiveBusiness(page, responseJson.businesses))
    })
    .catch((error) => console.log('loadYelpData error', error));
};





/*
export const loadYelpData = (token, isLoadMore) => (dispatch, getState) => {
  const { currentPage, options } = getState().businesses;
  let params = options;
  params.categories = options.categories.join(',');
  params.offset = currentPage;
  params.open_now = options.openNow;
  if(isLoadMore){
    params.offset = params.offset + 1;
    dispatch(loadMore(params.offset));
  }else{
    dispatch(loadData(params.offset));
  }
  fetch(`https://api.yelp.com/v3/businesses/search?location=${params.location}&term=${params.term}&categories=${params.categories}&open_now=${params.open_now}&offset=${params.offset}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      setTimeout(() => null, 0);
      return response.json();
    })
    .then((responseJson) => {
    //error can be occur here
      console.log('loadYelpData success', responseJson);
      dispatch(loadDataSuccess(responseJson.businesses, isLoadMore));
    })
    .catch((error) => console.log('loadYelpData error', error));
};*/
