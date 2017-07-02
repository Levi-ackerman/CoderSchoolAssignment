import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Switch,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppColors} from '../Styles/index';

const ITEM_WITH_SWITCH = 1;

const SettingItem = (props) => {
  const { type, option, value, onPress } = props;

  const renderItemWithSwitch = () => (
    <View style={styles.container}>
      <Text style={styles.option} numberOfLines={1}>{option}</Text>
      <Switch value={true} tintColor={AppColors.colorPrimary} />
    </View>
    );

  const renderItemWithoutSwitch = () => (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.option} numberOfLines={1}>{option}</Text>
        <Text style={styles.value} numberOfLines={1}>{value}</Text>
        <Icon name="keyboard-arrow-right"
              size={32}
              color={AppColors.colorSecondaryText}/>
      </View>
    </TouchableHighlight>
  );

  return (type === ITEM_WITH_SWITCH) ? renderItemWithSwitch()
    : renderItemWithoutSwitch();
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

export default SettingItem;
