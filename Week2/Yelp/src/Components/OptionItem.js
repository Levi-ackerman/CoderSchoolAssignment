import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Switch,
} from 'react-native';

import { AppColors} from '../Styles/index';

const OptionItem = (props) => {
  const {item, onValueChange, selectedValues} = props;

  let selected = false;
  if(selectedValues){
    for(let i = 0; i < selectedValues.length; i++){
      if(selectedValues[i] === item.alias){
        selected = true;
        break;
      }
    }
  }else {
    selected = item.selected;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.value} numberOfLines={1}>{item.title || item.name}</Text>
      <Switch onValueChange={(value) => onValueChange(value, item)}
              value={selected} tintColor={AppColors.colorPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
});

export default OptionItem;
