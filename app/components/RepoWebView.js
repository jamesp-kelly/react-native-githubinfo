import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, WebView } from 'react-native';

const RepoWebView = ({ url: uri }) => {
  return (
    <View style={styles.container}>
      <WebView source={{uri}} />
    </View>
  );
}

RepoWebView.propTypes = {
  url: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f6f6ef'
  }
});

export default RepoWebView;