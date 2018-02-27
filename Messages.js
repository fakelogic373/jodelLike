import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import UserImage from './UserImage'
import db from './db'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Messages extends React.Component {

  state = {
    to: '',
    content: '',
    messages: null,
    removeListener: null
  }

  async componentDidMount() {

    const setListener = await db.collection('users').doc(this.props.user).collection('messages').onSnapshot(
      snap => {
        let messages = []
        snap.forEach(
          doc =>
            messages.push({ id: doc.id, from: doc.data().from, to: doc.data().to, content: doc.data().content })
        )
        this.setState({ messages })
      })
    this.setState({ setListener })

  }

  componentWillUnmount() {
    this.state.removeListener()
  }

  async handleAdd() {
    await db.collection('users').doc(this.props.user).collection('messages').add({ from: this.props.user, to: this.state.to, content: this.state.content })
    await db.collection('users').doc(this.state.to).collection('messages').add({ from: this.props.user, to: this.state.to, content: this.state.content })
  }
  handleLogout() {
    firebase.auth().signOut()
}


  render() {
    return (
      <View style={styles.container}>
        <Text>Messages</Text>
        {
          this.state.messages
            ?
            <FlatList
              style={styles.list}
              data={this.state.messages}
              keyExtractor={message => message.id}
              renderItem={
                message => {
                  message = message.item 
                  return (
                    <View key={message.id}
                          style={message.from === this.props.user ? styles.fromMe : styles.toMe}>
                      {
                        message.from !== this.props.user
                        &&
                        <UserImage user={message.from} />
                      }
                      <Text>{message.content}</Text>
                    </View>
                  )
                }
              }
            />
            :
            <Text>Loading...</Text>
        }
        <UserImage user={this.props.user} />
        <TextInput
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
        />
        <Button
          onPress={() => this.handleLogout()}
          title="Logout"
        />
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
