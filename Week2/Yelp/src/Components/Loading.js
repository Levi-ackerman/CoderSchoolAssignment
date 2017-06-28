import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { AppColors } from '../Styles/index';

const {height, width} = Dimensions.get('window');

const LOADING_SIZE = 40;

const Loading = ({animating}) => {
  return (
    <ActivityIndicator style={styles.loading} size="large" animating={animating} color={AppColors.colorPrimary} />
  )
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: width/2 - LOADING_SIZE/2,
    top: height/2 - LOADING_SIZE/2
  },

});

export default Loading;
