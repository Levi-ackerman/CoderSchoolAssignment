import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const MenuItem = (props) => {
  const { selected, icon, routeName, navigate } = props;
  const bgColor = (selected ? '#BDBDBD' : '#FFF');
  const iconColor = (selected ? '#000' : '#757575');

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('DrawerClose');
        navigate(routeName);
      }}>
      <View style={[styles.menuWrapper, {backgroundColor: bgColor}]}>
        <Icon style={styles.icon} name={icon} color={iconColor} size={24} />
        <Text style={styles.title}>{routeName}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  menuWrapper: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  icon: {

  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '400',
    color: '#757575',
  }

});

export default MenuItem;