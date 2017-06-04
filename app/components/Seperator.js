import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';


const Seperator = () => {
  return (
    <View style={styles.seperator} />
  );
};

var styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#e4e4e4',
    flex: 1,
    marginLeft: 15
  }
});


export default Seperator;