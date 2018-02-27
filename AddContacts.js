import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import db from './db'
import * as firebase from 'firebase';
import 'firebase/firestore'
import UserImage from './UserImage'
export default class AddContact extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Add Contact`,
        }
    };
    state = {
        existingUsers: null,
        number: '',
        name: '',
        messages: null
    }
    // componentDidMount() {
    //     this.listenForItems()
    // }

    // async componentDidMount() {
    //     const setListener = await db.collection('users').onSnapshot(
    //         snap => {
    //             let existingUsers = []
    //             snap.forEach(
    //                 doc =>
    //                 existingUsers.push({ id: doc.id })
    //             )
    //             this.setState({ existingUsers })
    //         })
    //         console.log("Users : ", this.state.existingUsers)
    // }

    async componentDidMount() {
        const setListener = await db.collection('users').doc('aziz@aziz.com').collection('messages').onSnapshot(
          snap => {
            let messages = []
            snap.forEach(
              doc =>
                messages.push({ id: doc.id, from: doc.data().from, to: doc.data().to, content: doc.data().content })
            )
            this.setState({ messages })
          })
          console.log("Users : ", this.state.messages)
      }

    listenForItems() {
        db.collection('users')
            .onSnapshot(
                snap => {
                    let existingUsers = [];
                    snap.forEach((doc) => {
                        existingUsers.push({ id: doc.id })
                    })
                    this.setState({ existingUsers })
                });
        console.log("Users : ", this.state.existingUsers)
    }
    async handleAddContact() {
        let checkIfExists = this.state.existingUsers.findIndex(e => e.id == this.state.email)
        if (checkIfExists >= 0) {
            await db.collection('users').doc(this.props.navigation.state.params.user).collection('contacts').add({ name: this.state.name, email: this.state.email })
        }
        else {
            Alert.alert("Not a user of this app!")
        }
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>
                {/* <Image source={require('./profile.png')} style={{ height: 100, width: 100 }} /> */}
                <TextInput style={styles.inputBoxes} autoCapitalize="none" placeholder="name" onChangeText={name => this.setState({ name })} />
                <TextInput style={styles.inputBoxes} autoCapitalize="none" placeholder="email" onChangeText={email => this.setState({ email })} />
                <TouchableOpacity style={styles.contactbutton} onPress={() => this.handleAddContact()} >
                    <Text style={styles.contactbuttontext}>ADD</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'crimson',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: 'floralwhite',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBoxes: {
        width: 250,
        borderWidth: 3,
        height: 30,
        padding: 3,
        margin: 5,
        borderColor: 'crimson',
        backgroundColor: '#F8F9F9'
    },
    contactbutton: {
        backgroundColor: 'crimson',
        width: 250,
        height: 30,
        padding: 3,
        margin: 5,
        justifyContent: 'center'
    },
    contactbuttontext: {
        color: 'floralwhite',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
