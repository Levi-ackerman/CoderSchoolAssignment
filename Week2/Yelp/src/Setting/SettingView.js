import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SettingItem from '../Components/SettingItem';
//lib and constants
import { AppColors } from '../Styles/index';
import { CREATE_EDITING_SETTING } from './ActionType';

export default class SettingView extends Component {

  constructor(){
    super();
  }

  componentDidMount = () => {
    const { meta, navigation } = this.props;
    navigation.dispatch({
      type: CREATE_EDITING_SETTING,
      payload: meta,
    })
  };

  render() {
    const { editSetting, navigation } = this.props;
    if(!editSetting.distance){
      return null;
    }
    const { distance, sortBy, category } = editSetting;

    let categoryValue = '';
    category.map(item => categoryValue += (`${item.title}, `));


    return (
      <View style={styles.container}>

        <SettingItem
          type={2}
          option="Distance"
          value={distance.name}
          onPress={() => navigation.navigate('Distance', { selected: distance})}
        />

        <SettingItem
          type={2}
          option="Sort By"
          value={sortBy.name}
          onPress={() => navigation.navigate('SortBy', { selected: sortBy})}
        />

        <SettingItem
          type={2}
          option="Category"
          value={categoryValue}
          onPress={() => navigation.navigate('Category')}
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