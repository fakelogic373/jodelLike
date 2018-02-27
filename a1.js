
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Messages from './Messages'
import db from './db'
import Login from './Login'
import Test from './test'
import PostReceive from './postReceive'
import { StackNavigator } from 'react-navigation';



export default class App extends React.Component {

  state = {
    loading: true,
    user: null

  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription()
  }



  render() {
    console.log('user = ', this.props.user)

    if (this.state.loading)
      return null
    else if
    (this.state.user)
      return (
        // <Messages user={this.state.user.email}/>
        <PostReceive user={this.state.user.email}/>
       
      )
    else
      return <Login />
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

