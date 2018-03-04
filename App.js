import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Messages from './Messages'
import db from './db'
import Login from './Login'
import Screen1 from './screen1'
import Contacts from './Contacts'
import Register from './Register'
import AddContact from './AddContacts'
import PostsList from './PostsList'
import CommentsList from './CommentsList'
import CreatePost from './createpost'
import CreateComment from './createcomment'
import { StackNavigator, } from 'react-navigation';
import Tabnav from './tabnav'

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Contacts: { screen: Contacts },
  MessagesList: { screen: Messages },
  AddContact: { screen: AddContact },
  PostsList: {screen: PostsList },
  CommentsList: {screen: CommentsList},
  CreatePost: {screen: CreatePost},
  CreateComment: {screen: CreateComment},
  Tabnav: { screen: Tabnav}
},
  {
    initialRouteName: 'Login',
  }
);
