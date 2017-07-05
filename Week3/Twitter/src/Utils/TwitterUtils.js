import Crypto from 'crypto-js';
import {KEY} from './Constants';
import { Constants } from 'expo';

// Twitter keys
const twitterConsumerSecret = KEY.twitterConsumerSecret;
const twitterConsumerKey = KEY.twitterConsumerKey;


// URL + Routes
const requestTokenURL = '/oauth/request_token';
const authorizationURL = '/oauth/authorize';
const accessURL = '/oauth/access_token';
const baseURL = 'https://api.twitter.com';
const callbackURL = `${Constants.linkingUri}/+/redirect`;

export const requestUrl = () => {

  // Request Token
  // Creates base header + Request URL
  const tokenRequestHeaderParams = createHeaderBase();
  const tokenRequestURL = baseURL + requestTokenURL;

  // Add additional parameters for signature + Consumer Key
  tokenRequestHeaderParams.oauth_consumer_key = twitterConsumerKey;

  // Creates copy to add additional request params, to then create the signature
  const callBackParam = {oauth_callback: callbackURL};
  const parametersForSignature = Object.assign({}, callBackParam, tokenRequestHeaderParams);
  const signature = createSignature(parametersForSignature, 'POST', tokenRequestURL, twitterConsumerSecret);
  tokenRequestHeaderParams.oauth_signature = signature;
  // Creates the Header String, adds the callback parameter
  const headerString = createHeaderString(tokenRequestHeaderParams);
  const callbackKeyValue = ', oauth_callback="' + encodeURIComponent(callbackURL) + '"';
  const tokenRequestHeader = headerString + callbackKeyValue;
  console.log('1 : ' + tokenRequestHeader);
  // Request
  return fetch(tokenRequestURL,
    {method: 'POST', headers: {Authorization: tokenRequestHeader}})
    .then(response => {
      return response.text();
    })

  //   .then(response => {
  //     console.log('[TwitterUtils.js] xxx', response);
  //   const tokenResponse = parseFormEncoding(response);
  //   const authToken = tokenResponse.oauth_token;
  //   const authTokenSecret = tokenResponse.oauth_token_secret;
  //   // Token Authorization, send the URL to the native app to then display in 'Webview'
  //   const authURL = baseURL + authorizationURL + '?oauth_token=' + authToken;
  //   //res.json({ redirectURL: authURL, token: authToken, secretToken: authTokenSecret });
  // });


};

export const getAccessToken = (verifier, authToken, secretToken) => {

  // Creates base header + Access Token URL
  const accessTokenHeaderParams = createHeaderBase();
  const accessTokenURL = baseURL + accessURL;

  // Add additional parameters for signature + Consumer Key
  accessTokenHeaderParams.oauth_consumer_key = twitterConsumerKey;
  accessTokenHeaderParams.oauth_token = authToken;
  accessTokenHeaderParams.oauth_token_secret = secretToken;

  const accessTokenSignature = createSignature(accessTokenHeaderParams, 'POST', accessTokenURL, twitterConsumerSecret);
  accessTokenHeaderParams.oauth_signature = accessTokenSignature;

  // Creates the Header String, adds the oauth verfier
  const accessTokenHeaderString = createHeaderString(accessTokenHeaderParams);
  const verifierKeyValue = ', oauth_verifier="' + encodeURIComponent(verifier) + '"';
  const accessTokenRequestHeader = accessTokenHeaderString + verifierKeyValue;
  // Convert token to Access Token
  return fetch(accessTokenURL, {
    method: 'POST',
    headers: {Authorization: accessTokenRequestHeader}
  })
    .then(response => {
      return response.text();
    });


};

/**
 * Creates the Token Request OAuth header
 * @param  {Object} params OAuth params
 * @return {string}        OAuth header string
 */
function createHeaderString(params) {
  return 'OAuth ' + Object.keys(params).map(key => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(params[key]);
      return `${encodedKey}="${encodedValue}"`;
    }).join(', ');
}

function _createHeaderString(params) {
  return 'Bearer ' + Object.keys(params).map(key => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(params[key]);
      return `${encodedKey}="${encodedValue}"`;
    }).join(', ');
}

/**
 * Creates the header with the base parameters (Date, nonce etc...)
 * @return {Object} returns a header dictionary with base fields filled.
 */
function createHeaderBase() {
  return {
    oauth_consumer_key: '',
    oauth_nonce: createNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: new Date().getTime() / 1000,
    oauth_version: '1.0',
  };
}

/**
 * Creates a nonce for OAuth header
 * @return {string} nonce
 */
function createNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function createSignature(params, httpMethod, requestURL, consumerSecret, tokenSecret) {
  const encodedParameters = percentEncodeParameters(params);
  const upperCaseHTTPMethod = httpMethod.toUpperCase();
  const encodedRequestURL = encodeURIComponent(requestURL);
  const encodedConsumerSecret = encodeURIComponent(consumerSecret);

  const signatureBaseString = upperCaseHTTPMethod +
    '&' + encodedRequestURL +
    '&' + encodeURIComponent(encodedParameters);

  let signingKey;
  if (tokenSecret !== undefined) {
    signingKey = encodedRequestURL + '&' + encodeURIComponent(tokenSecret);
  } else {
    signingKey = encodedConsumerSecret + '&';
  }
  const signature = Crypto.HmacSHA1(signatureBaseString, signingKey);
  const encodedSignature = Crypto.enc.Base64.stringify(signature);
  return encodedSignature;
}

/**
 * Percent encode the OAUTH Header + Request parameters for signature
 * @param  {Object} params Dictionary of params
 * @return {string}        Percent encoded parameters string
 */
function percentEncodeParameters(params) {
  return Object.keys(params).map(key => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(params[key]);
    return `${encodedKey}=${encodedValue}`;
  }).join('&');
}

/**
 * Parse a form encoded string into an object
 * @param  {string} formEncoded Form encoded string
 * @return {Object}             Decoded data object
 */
export function parseFormEncoding(formEncoded) {
  const pairs = formEncoded.split('&');
  const result = {};
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    result[key] = value;
  }
  return result;
}

export const getHeaders = (url, params, data, consumerKey, consumerSecret,
                           method, oauthToken = '', oauthSecret = '') => {
  const nonce = testNonce || getNonce(32);
  const now = testNow || getNow();
  const sig = signature({
    url,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthSecret,
    params,
    method,
    data,
    nonce,
    now,
  });

  const header = `OAuth oauth_consumer_key="${encode(consumerKey)}",
    oauth_nonce="${encode(nonce)}",
    oauth_signature="${encode(sig)}",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="${encode(now)}",
    ${oauthToken && 'oauth_token="'}${oauthToken}${oauthToken && '",'}
    oauth_version="1.0"`.replace(/\n? +\n? */g, ' ');
  return { Authorization: header };
};
