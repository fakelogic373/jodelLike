import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import UserImage from './UserImage'
import db from './db'
import firebase from 'firebase'
import Test from './test'
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import Ads from './ads'
import * as Aziz from 'native-base';


export default class Posts extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Qatar`,
    }
  };

  state = {
    location: '',
    content: '',
    type: '',
    date: '',
    posts: null,
    removeListener: null,
    isClicked: null,
    userinfo: null

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

    // console.log("userinfo XXX=" + this.props.navigation.state.params.userinfo)

    var temp = this.props.navigation.state.params.userinfo
    // console.log("loc XXX=" + temp.location)
    this.setState({ location: temp.location })
    this.setState({ userinfo: temp })


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



  handleLogout() {
    firebase.auth().signOut()
  }


  render() {
    return (
      <Aziz.Container>
        <Aziz.Content>

            <Button
          title="Create a post"
          onPress={() => this.props.navigation.navigate('CreatePost', {
            user: this.props.navigation.state.params.user,
            userinfo: this.state.userinfo
          }
          )}
        />

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
                      <Aziz.Card style={{ flex: 0 }} key={message.id}>

                        <Aziz.CardItem>
                          <Aziz.Left>
                            <UserImage user={this.props.navigation.state.params.user} />
                            <Aziz.Body>
                              <Aziz.Text>{message.owner}</Aziz.Text>
                              <Aziz.Text note>April 15, 2016</Aziz.Text>
                            </Aziz.Body>
                          </Aziz.Left>
                        </Aziz.CardItem>

                        <Aziz.CardItem>
                          <Aziz.Body>
                            <Aziz.Text>
                              {message.content}
                            </Aziz.Text>
                          </Aziz.Body>
                        </Aziz.CardItem>

                        <Aziz.CardItem>

                          <Aziz.Left>
                            <Aziz.Button transparent textStyle={{ color: '#87838B' }} onPress={() => this.props.navigation.navigate('CommentsList', {
                              user: this.props.navigation.state.params.user,
                              id: message.id,
                              location: this.state.location
                            }
                            )}>
                              <Aziz.Icon name="chatbubbles" />
                              <Aziz.Text>0 Comments</Aziz.Text>
                            </Aziz.Button>
                          </Aziz.Left>

                          <Aziz.Right>
                            {
                              this.props.navigation.state.params.user == message.owner
                                ?
                                <Aziz.Button transparent onPress={() => db.collection('posts').doc(this.state.location).collection('posts').doc(message.id).delete()}>
                                  <Aziz.Text style={{ color: 'red' }} >Delete</Aziz.Text>
                                  <Aziz.Icon style={{ color: 'red' }} name="ios-trash" />
                                </Aziz.Button>
                                :
                                <Text />
                            }
                          </Aziz.Right>

                        </Aziz.CardItem>

                      </Aziz.Card>
                    )
                  }
                }
              />
              :
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
                <Image style={{ width: 100, height: 100 }} source={require('./loading.gif')} />
              </View>
          }

          {
            this.state.userinfo
              ?
              <Ads userinfo={this.state.userinfo} />
              :
              <Text >default ad</Text>
          }


        </Aziz.Content>
      </Aziz.Container>

      // <View style={styles.container}>
      //   <Text>Posts</Text>
      //   <Text>{this.state.location}</Text>
      //   {
      //     this.state.posts
      //       ?


      // <FlatList
      //   style={styles.list}
      //   data={this.state.posts}
      //   keyExtractor={message => message.id}
      //   renderItem={
      //     message => {
      //       message = message.item // because of FlatList

      //       return (
      //               <View key={message.id} style={styles.toMe}>
      //                 <Text>{message.owner}</Text>

      //                 <Text>{message.content}</Text>
      //                 <Button
      //                   title="Go to comment"
      //                   onPress={() => this.props.navigation.navigate('CommentsList', {
      //                     user: this.props.navigation.state.params.user,
      //                     id: message.id,
      //                     location: this.state.location
      //                   }
      //                   )}
      //                 />

      //                 {
      //                   this.props.navigation.state.params.user == message.owner
      //                     ?
      //                     <Button
      //                       title="DeletePost"
      //                       onPress={() => db.collection('posts').doc(this.state.location).collection('posts').doc(message.id).delete()
      //                       }
      //                     />
      //                     :
      //                     <Text />
      //                 }
      //               </View>
      //             )
      //           }
      //         }
      //       />
      //       :
      //       <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
      //           <Image style={{ width: 100, height: 100 }} source={require('./loading.gif')} />
      //         </View>
      //   }
      //   <UserImage userinfo={this.props.navigation.state.params.user} />










      



      // </View>

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
    width: '100%',
  },
  fromMe: {
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: '#dcf8c8',
    alignSelf: 'flex-end'
  },
  toMe: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-start'
  }
});

