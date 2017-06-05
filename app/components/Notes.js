import React, { Component } from 'react';
import { View, 
  Text, 
  ListView, 
  TextInput, 
  StyleSheet, 
  TouchableHighlight 
} from 'react-native';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Seperator from './Seperator';
import Badge from './Badge';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.navParams = this.props.navigation.state.params;
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.navParams.notes),
      note: '',
      error: ''
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  static navigationOptions = {
    title: 'Notes'
  };

  handleSearchInputChange(e) {
    const note = e.nativeEvent.text;
    this.setState({ note });
  }

  handleSubmit() {
    const note = this.state.note;
    this.setState({
      note: ''
    });

    api.addNote(this.navParams.userInfo.login, note)
      .then((data) => {
        api.getNotes(this.navParams.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          }).catch((err) => {
            console.log('Request failed', err);
            this.setState({ error });
          });
      });
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput} 
          value={this.state.note}
          onChange={this.handleSearchInputChange}
          placeholder="New Note"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor='#88d4f5'>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
        <Seperator />
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={params.userInfo} />}
        />
        {this.footer()}
      </View>
    );    
  }
}

// Notes.propTypes = {
//   userInfo: PropTypes.object.isRequired,
//   notes: PropTypes.object.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48bbec',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});


export default Notes;