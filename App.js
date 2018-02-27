import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Messages from './Messages.js'
import db from './db'
import Login from './Login'
import Screen1 from './screen1'
import Contacts from './Contacts'
import Register from './Register'
import AddContact from './AddContacts'
import PostsReceive from './postReceive'
import PostComments from './postComments'
import { StackNavigator, } from 'react-navigation';


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


const RootStack = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Contacts: { screen: Contacts },
  Messages: { screen: Messages },
  AddContact: { screen: AddContact },
  PostsReceive: {screen: PostsReceive },
  PostsReceive: {screen: PostsReceive },
  PostComments: {screen: PostComments}
},
  {
    initialRouteName: 'Login',
  }
);
