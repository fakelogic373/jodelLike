
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Messages from './Messages'
import db from './db'
import Login from './Login'
import Test from './test'
import PostReceive from './postReceive'
import Navigation from './navgation'
import Screen1 from './screen1'
import { StackNavigator } from 'react-navigation';



export default class App extends React.Component {

  state = {
    loading: true,
    user: null

  }

  render() {

    return <RootStack />
  }
}



const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 10,
      width: 300
    }

  });


const RootStack = StackNavigator(
  {
    Home: {
      screen: Navigation,
    },
    Messages: {
      screen: Screen1,
    },

  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: { backgroundColor: '#474787' },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 16
      }
    }
  },

);