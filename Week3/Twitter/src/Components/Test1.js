import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const Test1 = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        test1 screen
      </Text>
      <Button title={'Click'} onPress={() => props.navigation.navigate('Main')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default Test1;
