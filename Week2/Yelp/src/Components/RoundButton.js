import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

const RoundButton = ({ text, onPress, buttonStyle, textButtonStyle, rippleColor }) => {
  if(Platform.OS === 'android'){
    return AndroidButton({ text, onPress, buttonStyle, textButtonStyle, rippleColor });
  }else {
    return IOSButton({ text, onPress, buttonStyle, textButtonStyle });
  }
};

const AndroidButton = ({ text, onPress, buttonStyle, textButtonStyle, rippleColor }) => {
  return (
    <View style={[styles.buttonStyle, buttonStyle]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(rippleColor, true)}>
        <View style={styles.textWrapper}>
          <Text style={[textButtonStyle, styles.textButtonStyle]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const IOSButton = ({ text, onPress, buttonStyle, textButtonStyle }) => {
  return (
    <TouchableHighlight
      style={[styles.buttonStyle, buttonStyle]}
      onPress={onPress}>
      <View style={styles.textWrapper}>
        <Text style={[textButtonStyle, styles.textButtonStyle]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

RoundButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  buttonStyle: PropTypes.number,
  textButtonStyle: PropTypes.number,
  rippleColor: PropTypes.string,
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonStyle: {
    fontWeight: '400',
  }
});

export default RoundButton;
