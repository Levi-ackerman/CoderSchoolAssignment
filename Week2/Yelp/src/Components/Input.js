import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';

import { AppColors} from '../Styles/index';

const Input = (props) => {
  const {value, focus, placeholder, keyboardType, returnKeyType, secureTextEntry,
    onSubmitEditing, onChangeText, error } = props;
  const borderBottomColor = (error ? 'red' : AppColors.colorSecondaryText);

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper,
        {borderBottomColor: borderBottomColor}]}>
        <TextInput
          multiline={false}
          ref={(input) => {
            if(focus && input){
              input.focus();
            }
          }}
          value={value}
          autoCapitalize={'none'}
          placeholderTextColor={AppColors.colorSecondaryText}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          underlineColorAndroid={'transparent'}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          style={styles.input}/>
      </View>
      {
        error && (<Text style={styles.error}>{error}</Text>)
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputWrapper: {
    height: 36,
    borderBottomWidth: 1.5,
    marginTop: 12,
  },
  input: {
    flex: 1,
    paddingBottom: 4,
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 8,
  }

});

export default Input;
