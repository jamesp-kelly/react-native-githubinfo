import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../utils/api';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.navParams = this.props.navigation.state.params;
    this.goToProfile = this.goToProfile.bind(this);
    this.goToRepos = this.goToRepos.bind(this);
    this.goToNotes = this.goToNotes.bind(this);
    this.generateBackgroundStyle = this.generateBackgroundStyle.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.userInfo.name,
  });


  goToProfile() {
    this.props.navigation.navigate('Profile', {
      userInfo: this.navParams.userInfo
    });
  }

  goToRepos() {
    api.getRepos(this.navParams.userInfo.login)
      .then((res) => {
        this.props.navigation.navigate('Repositories', { 
          userInfo: this.navParams.userInfo,
          repos: res
        });
      });
  }

  goToNotes() {
    api.getNotes(this.navParams.userInfo.login)
      .then((res) => {
        res = res || {};
        debugger;
        this.props.navigation.navigate('Notes', {
          notes: res,
          userInfo: this.navParams.userInfo
        });
      });
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
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image source={{uri: params.userInfo.avatar_url}} style={styles.image} />
        
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