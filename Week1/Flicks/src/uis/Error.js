import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../Colors';

const Error = ({ text, tryAgain }) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Icon name={'error-outline'} size={50} color={'#CCC'} />
    <Text style={{color: Color.primary}}>{text}</Text>
  </View>
);

Error.propTypes = { text: PropTypes.string };
Error.defaultProps = { text: 'Woops, Something went wrong.' };
Error.componentName = 'Error';

export default Error;
