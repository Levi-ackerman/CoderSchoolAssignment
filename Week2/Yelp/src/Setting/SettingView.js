import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

//component
import Input from '../Components/Input';
import RoundButton from '../Components/RoundButton';
import SettingItem from '../Components/SettingItem';
//lib and constants
import { AppColors } from '../Styles/index';
import { LIST_DISTANCE } from '../Lib/Constant';

export default class SettingView extends Component {

  constructor(){
    super();
  }

  render() {
    console.log('[SettingView.js] render', this.props);
    const { openNow, distance } = this.props;
    return (
      <View style={styles.container}>
        <SettingItem
          type={1}
          selected={openNow}
          option="Open Now"
        />

        <SettingItem
          type={2}
          option="Distance"
          value={distance}
          navigation={this.props.navigation}
          optionList={LIST_DISTANCE}
          optionListTitle="Distance"
        />

        <SettingItem
          type={2}
          option="Sort By"
          value="Best Match"
          navigation={this.props.navigation}
        />

        <SettingItem
          type={2}
          option="Category"
          value="Mit, xoai oi"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 40,
  },
  buttonLogin: {
    width: null,
    height: 40,
    marginTop: 64,
    backgroundColor: AppColors.colorSecondaryText,
  },
  buttonTextLogin: {
    color: '#FFF',
    fontSize: 20,
  },
  facebookLogin: {
    width: null,
    height: 40,
    borderWidth: 1.5,
    borderColor: AppColors.colorPrimary,
    marginTop: 32,
  },
  textFacebookLogin: {
    color: AppColors.colorPrimary,
    fontSize: 20,
  },
});