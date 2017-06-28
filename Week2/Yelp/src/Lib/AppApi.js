// import axios from 'axios';
import qs from 'qs';

// import { get, set } from 'utils/storage';
// import { notificationError } from 'containers/App/actions';
export const API_ENDPOINT = 'https://api.yelp.com/';
export const API_KEY = '156da9aff06ae19c941ee4dce9c4b128_';

export default function configureAxios(store) {
  axios.defaults.baseURL = API_ENDPOINT;

  // axios.defaults.params = {
  //   api_key: API_KEY,
  // };

  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // if (get('auth-token')) {
  //   const authToken = JSON.parse(get('auth-token'));
  //   axios.defaults.headers.common.Authorization = `${authToken.token_type} ${authToken.access_token}`;
  // }

  // axios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //
  //   // if (config.method === 'post') {
  //   //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8',
  //   //   config.data = qs.stringify(config.data)
  //   // }
  //
  //
  //   console.log('[AppApi.js] Request', config);
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   console.log('[AppApi.js] Request error', error);
  //   return Promise.reject(error);
  // });
  //
  // axios.interceptors.response.use(function (response) {
  //   // Do something with response data
  //   console.log('[AppApi.js] Response success', response);
  //   return response;
  // }, function (error) {
  //   // Do something with response error
  //   console.log('[AppApi.js] Response error', error);
  //   return Promise.reject(error);
  // });
}
