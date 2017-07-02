import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Test2 = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        test2 screen
      </Text>
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

export default Test2;
