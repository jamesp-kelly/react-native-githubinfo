import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import Profile from './Profile';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToRepos = this.goToRepos.bind(this);
    this.goToNotes = this.goToNotes.bind(this);
    this.generateBackgroundStyle = this.generateBackgroundStyle.bind(this);
  }

  goToProfile() {
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos() {
    console.log('going to repos');
  }

  goToNotes() {
    console.log('going to notes');
  }

  generateBackgroundStyle(btn) {
    const baseStyle = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    const backgroundColor = this.getBackgroundColor(btn);

    return {
        ...baseStyle,
        backgroundColor
    };
  }

  getBackgroundColor(btn) {
    switch(btn) {
      case 0:
        return '#48bbec';
      case 1:
        return '#e77aae';
      default:
        return '#758bf4';
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
        
        <TouchableHighlight
          onPress={this.goToProfile}
          style={this.generateBackgroundStyle(0)}
          underlayColor='#88d4f5'>
          <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.goToRepos}
          style={this.generateBackgroundStyle(1)}
          underlayColor='#88d4f5'>
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.goToNotes}
          style={this.generateBackgroundStyle(2)}
          underlayColor='#88d4f5'>
          <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default Dashboard;