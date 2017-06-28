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
  const {item, onValueChange} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.option} numberOfLines={1}>{item.name}</Text>
      <Switch onValueChange={(value) => onValueChange(value, item)}
              value={item.selected} tintColor={AppColors.colorPrimary} />
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
  option: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    marginRight: 16
  },
  value: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default OptionItem;
