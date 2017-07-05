import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const MenuItem = (props) => {
  const { selected, icon, routeName, navigate } = props;
  const bgColor = (selected ? '#FFF' : '#138BF2');
  const iconColor = (selected ? '#FFF' : '#138BF2');

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('DrawerClose');
        navigate(routeName);
      }}>
      <View style={[styles.menuWrapper, {backgroundColor: '#262C36'}]}>
        <MaterialIcons name={icon} color={iconColor} size={24} />
        <Text style={[styles.title, {color : bgColor}]}>{routeName}</Text>
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