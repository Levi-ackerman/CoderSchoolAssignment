import { AsyncStorage } from 'react-native';

const get = (key) => {
  return AsyncStorage.getItem(key);
};

const set = (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export {
  get,
  set,
}