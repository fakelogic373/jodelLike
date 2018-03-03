import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, FlatList, ImageBackground } from 'react-native';
import db from './db'
import firebase from 'firebase';
import UserImage from './UserImage'
import * as Aziz from 'native-base';


export default class Messages extends React.Component {

  

  static navigationOptions = ({ navigation }) => {
    return {
      title: ``,
    }
  };

  state = {
    messages: null,
    to: '',
    content: '',
    removeListener: null
  }
  async componentDidMount() {
    const setListener = await db.collection('users').doc(this.props.navigation.state.params.user).collection('messages').orderBy("date").onSnapshot(
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
    this.state.removeListener
  }

  async handleAdd() {
    await db.collection('users').doc(this.props.navigation.state.params.user).collection('messages').add({ from: this.props.navigation.state.params.user, to: this.props.navigation.state.params.to, content: this.state.content, date: new Date() })
    await db.collection('users').doc(this.props.navigation.state.params.to).collection('messages').add({ from: this.props.navigation.state.params.user, to: this.props.navigation.state.params.to, content: this.state.content, date: new Date() })
  }

  handleLogout() {
    firebase.auth().signOut()
  }

  render() {
    return (

      
<ImageBackground source={require('./images/ChatBackGround.jpg')} style={styles.container}>
      <Aziz.Container>
        
        <Aziz.Content>
          {
            this.state.messages
              ?
              <FlatList
                style={styles.list}
                data={this.state.messages}
                keyExtractor={message => message.id}
                renderItem={
                  message => {
                    message = message.item // because of FlatList
                    return (
                      <Aziz.Button rounded key={message.id}
                        style={message.from === this.props.navigation.state.params.user ? styles.fromMe : styles.toMe}>
                        {
                          message.from !== this.props.navigation.state.params.user
                          &&
                          <UserImage user={message.from} />
                        }
                        <Aziz.Text style={{ color: 'black' }}>{message.content}</Aziz.Text>
                      </Aziz.Button>
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
        


        <Aziz.Footer>

          <Aziz.Content style={{ paddingTop: 10 }}>

            <Aziz.Item rounded style={{ height: 40 }}>

              <UserImage user={this.props.navigation.state.params.user} />

              <Aziz.Input placeholder=' Send Message ...' onChangeText={content => this.setState({ content })} />

              <Aziz.Button rounded Right autoCapitalize='none' autoCorrect={false} style={{ height: 39, backgroundColor: 'green' }} onPress={() => this.handleAdd()}>
                <Aziz.Icon active name="ios-paper-plane" />
              </Aziz.Button>

            </Aziz.Item>

          </Aziz.Content>

        </Aziz.Footer>

      </Aziz.Container>
      </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece5dd',
    //alignItems: 'center',
    //justifyContent: 'center',
    //flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',

  },
  background: {

  },
  list: {
    width: '100%'
  },
  fromMe: {
    padding: 10,
    margin: 10,
    backgroundColor: '#dcf8c8',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5
  },
  toMe: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#FAE5D3',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30
  }
});
