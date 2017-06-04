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

class Repositories extends Component {
  constructor(props) {
    super(props);
    this.openPage = this.openPage.bind(this);
  }

  openPage(url) {
    return () => {
      console.log(url);
    }
  }

  render() {
    const { repos, userInfo } = this.props;
    const list = repos.map((item, index) => {
      var desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View />;
      
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage(repos[index].html_url)}
              underlayColor='transparent'>
                <Text style={styles.name}>{repos[index].name}</Text>
              </TouchableHighlight>
              <Text style={styles.stars}> Stars: {repos[index].stargazers_count}</Text>
              {desc}
          </View>
          <Seperator />
        </View>
      )
      
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
};

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