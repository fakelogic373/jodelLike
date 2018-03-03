import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import UserImage from './UserImage'
import db from './db'
import firebase from 'firebase'
import Test from './test'
import { StackNavigator } from 'react-navigation';
import * as Aziz from 'native-base';


export default class Comments extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Comments`,
    }
  };

  state = {
    username: '',
    content: '',
    comments: null

  }

  async componentDidMount() {
    const setListener = await db.collection('posts').doc(this.props.navigation.state.params.location).collection('posts').
      doc(this.props.navigation.state.params.id).collection('comments').orderBy('date').onSnapshot(
        snap => {
          let comments = []
          snap.forEach(
            doc =>
              comments.push({
                id: doc.id,
                username: doc.data().username,
                content: doc.data().content,

              })
          )
          this.setState({ comments })
        })
    // this.setState({ setListener })
  }

  componentWillUnmount() {
    // this.state.removeListener()
  }





  render() {
    return (

      <Aziz.Container>

        <Aziz.Content>
          {
            this.state.comments
              ?
              <FlatList
                style={styles.list}
                data={this.state.comments}
                keyExtractor={comment => comment.id}
                renderItem={
                  comment => {
                    comment = comment.item
                    return (
                      <Aziz.List key={comment.id}>
                        <Aziz.ListItem avatar>

                          <Aziz.Left>
                            <UserImage user={this.props.navigation.state.params.user} />
                          </Aziz.Left>

                          <Aziz.Body>
                            <Aziz.Text>{comment.username}</Aziz.Text>
                            <Aziz.Text note>{comment.content}</Aziz.Text>
                          </Aziz.Body>

                          <Aziz.Right>
                            <Aziz.Text note>3:43 pm</Aziz.Text>
                          </Aziz.Right>

                        </Aziz.ListItem>
                      </Aziz.List>
                    )
                  }
                }
              />
              :
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
                <Image style={{ width: 100, height: 100 }} source={require('./loading.gif')} />
              </View>
          }
        </Aziz.Content>

        <View style={{ flex: 1 }}>
          <Aziz.Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ paddingBottom: 20 }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Aziz.Icon name="ios-more" />

            <Aziz.Button style={{ backgroundColor: '#3B5998' }}
              onPress={() => this.props.navigation.navigate('CreateComment', {
                user: this.props.navigation.state.params.user,
                id: this.props.navigation.state.params.id,
                location: this.props.navigation.state.params.location
              }
              )}>
              <Aziz.Icon name="ios-chatboxes" />
            </Aziz.Button>

          </Aziz.Fab>
        </View>

      </Aziz.Container>


      // <View style={styles.container}>
      //   <Button
      //     title="Add a comment"
          // onPress={() => this.props.navigation.navigate('CreateComment', {
          //   user: this.props.navigation.state.params.user,
          //   id: this.props.navigation.state.params.id,
          //   location: this.props.navigation.state.params.location
          // }
          // )}
      //   />
      //   <Text>comments</Text>
      //   {
      //     this.state.comments
      //       ?
            // <FlatList
            //   style={styles.list}
            //   data={this.state.comments}
            //   keyExtractor={comment => comment.id}
            //   renderItem={
            //     comment => {
            //       comment = comment.item

            //       return (
      //               <View key={comment.id} style={styles.toMe}>
      //                 <Text>{comment.username}</Text>

      //                 <Text>{comment.content}</Text>



      //               </View>
      //             )
      //           }
      //         }
      //       />
      //       :
      // <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
      //   <Image style={{ width: 100, height: 100 }} source={require('./loading.gif')} />
      // </View>
      //   }
      //   <UserImage user={this.props.navigation.state.params.user} />


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
