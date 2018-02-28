import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import UserImage from './UserImage'
import db from './db'
import firebase from 'firebase'
import Test from './test'
import { StackNavigator } from 'react-navigation';

export default class Comments extends React.Component {

  state = {
    username:'',
    content:'',
    comments: null

  }

  async componentDidMount() {
    const setListener = await db.collection('posts').doc('Qatar').collection('posts').
    doc(this.props.navigation.state.params.id).collection('comments').onSnapshot(
      snap => {
        let comments = []
        snap.forEach(
          doc =>
          comments.push({
              id: doc.id,
              username: doc.data().username,
              content: doc.data().content
            })
        )
        this.setState({ comments })
      })
    // this.setState({ setListener })
  }

  componentWillUnmount() {
    // this.state.removeListener()
  }

  //   async handleAdd() {
  //     // await db.collection('users').doc(this.props.navigation.state.params.user).collection('posts').add({ from: this.props.navigation.state.params.user, to: this.state.to, content: this.state.content })
  //     // await db.collection('users').doc(this.state.to).collection('posts').add({ from: this.props.navigation.state.params.user, to: this.state.to, content: this.state.content })
  //     await db.collection('posts').doc(this.props.navigation.state.params.user).add({ from: this.props.navigation.state.params.user, to: this.state.to, content: this.state.content })
  //     await db.collection('posts').doc(this.state.to).add({ from: this.props.navigation.state.params.user, to: this.state.to, content: this.state.content })
  //   }

  handleLogout() {
    firebase.auth().signOut()
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>comments</Text>
        {
          this.state.comments
            ?
            <FlatList
              style={styles.list}
              data={this.state.comments}
              keyExtractor={comment => comment.id}
              renderItem={
                comment => {
                  comment = comment.item // because of FlatList

                  return (
                    <View key={comment.id} style={styles.toMe}>

                      <Text>{comment.content}</Text>
                      


                    </View>
                  )
                }
              }
            />
            :
            <Text>Loading...</Text>
        }
        <UserImage user={this.props.navigation.state.params.user} />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece5dd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%'
  },
  fromMe: {
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: '#dcf8c8',
    alignSelf: 'flex-end'
  },
  toMe: {
    flexDirection: 'row',
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-start'
  }
});
