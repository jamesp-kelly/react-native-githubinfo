import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Badge from './Badge';
import Seperator from './Seperator';

class Profile extends Component {

  static navigationOptions = {
    title: 'Profile'
  };

  getRowTitle(user, item) {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    const { params } = this.props.navigation.state;

    var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

    const list = topicArr.map((item, index) => {
      if (!params.userInfo[item]) {
        return <View key={index}></View>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{this.getRowTitle(params.userInfo, item)}</Text>
              <Text style={styles.rowContent}>{params.userInfo[item]}</Text>
            </View>
            <Seperator />
          </View>
        )
      }
    });

    return (
      <ScrollView>
        <Badge userInfo={params.userInfo}></Badge>
        {list}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48bbec',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

export default Profile;