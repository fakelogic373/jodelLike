import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import db from './db'
import * as firebase from 'firebase';
import 'firebase/firestore'
import UserImage from './UserImage'
import * as Aziz from 'native-base';


export default class AddContact extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Add Contact`,
        }
    };
    state = {
        existingUsers: null,
        email: '',
        name: '',

    }
    // componentDidMount() {
    //     this.listenForItems()
    // }



    async componentDidMount() {
        const setListener = await db.collection('users').onSnapshot(
            snap => {
                let existingUsers = []
                snap.forEach(
                    doc =>
                        existingUsers.push({ id: doc.id })
                )
                this.setState({ existingUsers })
            })


    }

    // listenForItems() {
    //     db.collection('users')
    //         .onSnapshot(
    //             snap => {
    //                 let existingUsers = [];
    //                 snap.forEach((doc) => {
    //                     existingUsers.push({ id: doc.id })
    //                 })
    //                 this.setState({ existingUsers })
    //             });
    //     console.log("Users : ", this.state.existingUsers)
    // }



    async handleAddContact() {
        // let checkIfExists = this.state.existingUsers.findIndex(e => e.id == this.state.email)
        // if (checkIfExists >= 0) {
        //     await db.collection('users').doc(this.props.navigation.state.params.user).collection('contacts').add({ name: this.state.name, email: this.state.email })
        // }
        // else {
        //     Alert.alert("Not a user of this app!")
        // }
        await db.collection('users').doc(this.props.navigation.state.params.user).collection('contacts').add({ id: this.state.email, name: this.state.name, email: this.state.email })
        this.props.navigation.goBack();



    }

    render() {
        const { navigate } = this.props.navigation


        return (
            // <View style={styles.container}>

            //     <TextInput style={styles.inputBoxes} autoCapitalize="none" placeholder="name" onChangeText={name => this.setState({ name })} />
            //     <TextInput style={styles.inputBoxes} autoCapitalize="none" placeholder="email" onChangeText={email => this.setState({ email })} />
            //     <TouchableOpacity style={styles.contactbutton} onPress={() => this.handleAddContact()} >
            //         <Text style={styles.contactbuttontext}>ADD</Text>
            //     </TouchableOpacity>
            //     <Button title="test: show me a user" onPress={() => Alert.alert(this.state.existingUsers[4].id) }/>

            // </View>

            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>

                    <Aziz.Form>


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Name</Aziz.Label>
                            <Aziz.Input autoCapitalize='none' autoCorrect={false} onChangeText={name => this.setState({ name })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Email</Aziz.Label>
                            <Aziz.Input autoCapitalize='none' autoCorrect={false} onChangeText={email => this.setState({ email })} />
                        </Aziz.Item>

                        <View style={{ padding: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Aziz.Button block success iconLeft onPress={() => this.handleAddContact()}>
                                <Aziz.Icon name='person-add' />
                                <Aziz.Text>Add Contact</Aziz.Text>
                            </Aziz.Button>
                        </View>



                    </Aziz.Form>

                </Aziz.Content>

                {/* FOOTER */}
                <Aziz.Footer>


                </Aziz.Footer>

            </Aziz.Container>
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
