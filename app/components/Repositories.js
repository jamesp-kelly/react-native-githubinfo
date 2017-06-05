import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableHighlight 
} from 'react-native'
import Badge from './Badge';
import Seperator from './Seperator';
import RepoWebView from './RepoWebView';

class Repositories extends Component {
  constructor(props) {
    super(props);
    this.openPage = this.openPage.bind(this);
  }

  static navigationOptions = {
    title: 'Repositories'
  };

  openPage(url) {
    return () => {
      this.props.navigator.push({
        component: RepoWebView,
        title: 'Web View',
        passProps: { url }
      });
    }
  }

  render() {
    const { params } = this.props.navigation.state;

    const list = params.repos.map((repo, index) => {
      var desc = repo.description ? <Text style={styles.description}>{repo.description}</Text> : <View />;
      
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage(repo.html_url)}
              underlayColor='transparent'>
                <Text style={styles.name}>{repo.name}</Text>
              </TouchableHighlight>
              <Text style={styles.stars}> Stars: {repo.stargazers_count}</Text>
              {desc}
          </View>
          <Seperator />
        </View>
      );
      
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={params.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

// Repositories.propTypes = {
//   userInfo: React.PropTypes.object.isRequired,
//   repos: React.PropTypes.array.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48bbec',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48bbec',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export default Repositories;