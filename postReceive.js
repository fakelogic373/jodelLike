import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import UserImage from './UserImage'
import db from './db'
import firebase from 'firebase'
import Test from './test'
import { StackNavigator } from 'react-navigation';

export default class Posts extends React.Component {

  state = {
    location: '',
    content: '',
    type: '',
    date: '',
    posts: null,
    removeListener: null,
    isClicked: null,


  }

  async componentDidMount() {
    const setListener = await db.collection('users').doc(this.props.user).collection('postsreceive').onSnapshot(
      snap => {
        let posts = []
        snap.forEach(
          doc =>
            posts.push({ id: doc.id, type: doc.data().type, location: doc.data().location, content: doc.data().content, date: doc.data().date })
        )
        this.setState({ posts })
      })
    this.setState({ setListener })
  }

  componentWillUnmount() {
    this.state.removeListener()
  }

  //   async handleAdd() {
  //     // await db.collection('users').doc(this.props.user).collection('posts').add({ from: this.props.user, to: this.state.to, content: this.state.content })
  //     // await db.collection('users').doc(this.state.to).collection('posts').add({ from: this.props.user, to: this.state.to, content: this.state.content })
  //     await db.collection('posts').doc(this.props.user).add({ from: this.props.user, to: this.state.to, content: this.state.content })
  //     await db.collection('posts').doc(this.state.to).add({ from: this.props.user, to: this.state.to, content: this.state.content })
  //   }

  handleLogout() {
    firebase.auth().signOut()
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Posts</Text>
        {
          this.state.posts
            ?
            <FlatList
              style={styles.list}
              data={this.state.posts}
              keyExtractor={message => message.id}
              renderItem={
                message => {
                  message = message.item // because of FlatList

                  return (
                    <View key={message.id} style={styles.toMe}>

                      <Text>{message.content}</Text>
                      <Button
                        title="Go to Second"
                        onPress={() => this.props.navigation.navigate('Messages', {
                          useremail: this.props.user
                        }
                        
                        )}
                      />


                    </View>
                  )
                }
              }
            />
            :
            <Text>Loading...</Text>
        }
        <UserImage user={this.props.user} />
        {/* <TextInput
          placeholder="To"
          value={this.state.to}
          onChangeText={to => this.setState({ to })}
        />
        <TextInput
          placeholder="Content"
          value={this.state.content}
          onChangeText={content => this.setState({ content })}
        />
        <Button
          onPress={() => this.handleAdd()}
          title="Send"
        /> */}
        {/* <Button
          onPress={() => this.handleLogout()}
          title="Logout"
        /> */}
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
