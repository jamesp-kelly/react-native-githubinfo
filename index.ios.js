/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Main from './app/components/Main';
import Dashboard from './app/components/Dashboard';
import Profile from './app/components/Profile';
import Repositories from './app/components/Repositories';
import Notes from './app/components/Notes';


const noteTakerApp = StackNavigator({
  Home: { screen: Main},
  Dashboard: { screen: Dashboard },
  Profile: { screen: Profile },
  Repositories: { screen: Repositories },
  Notes: { screen: Notes }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  }
});

AppRegistry.registerComponent('githubNotetaker', () => noteTakerApp);
