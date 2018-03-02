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
    // var temp;

    // const userinfo = await db.collection('users').doc(this.props.navigation.state.params.user)
    // userinfo.get().then(function (user) {
    //   if (user.exists) {
    //     console.log("data=", user.data());
    //     temp = user.data();
    //     console.log("data=", temp.location);
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

    console.log("userinfo XXX=" + this.props.navigation.state.params.userinfo)

    var temp = this.props.navigation.state.params.userinfo
    console.log("loc XXX=" + temp.location)
    this.setState({ location: temp.location })


    const setListener = await db.collection('posts').doc(temp.location).collection('posts').orderBy("date", "desc").onSnapshot(
      snap => {
        let posts = []
        snap.forEach(
          doc =>
            posts.push({
              id: doc.id,
              owner: doc.data().owner,
              date: doc.data().date,
              type: doc.data().type,
              content: doc.data().content,
            })
        )
        this.setState({ posts })
      })



    // this.setState({ setListener })
  }

  componentWillUnmount() {
    this.state.removeListener()
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
        <Text>Posts</Text>
        <Text>{this.state.location}</Text>
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
                      <Text>{message.owner}</Text>

                      <Text>{message.content}</Text>
                      <Button
                        title="Go to comment"
                        onPress={() => this.props.navigation.navigate('CommentsList', {
                          user: this.props.navigation.state.params.user,
                          id: message.id,
                          location: this.state.location
                        }
                        )}
                      />

                      {
                        this.props.navigation.state.params.user == message.owner
                          ?
                          <Button
                            title="DeletePost"
                            onPress={() => db.collection('posts').doc(this.state.location).collection('posts').
                              doc(message.id).delete()
                            }
                          />
                          :
                          <Text />
                      }




                    </View>
                  )
                }
              }
            />

            :
            <Text>Loading...</Text>
        }
        <UserImage user={this.props.navigation.state.params.user} />

        <Button
          title="Create a post"
          onPress={() => this.props.navigation.navigate('CreatePost', {
            user: this.props.navigation.state.params.user
          }
          )}
        />


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
