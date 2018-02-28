import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity,Alert } from 'react-native';
import db from './db'
import * as firebase from 'firebase';
import 'firebase/firestore'
import UserImage from './UserImage'
export default class Contacts extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `My Contacts`,
        }
    };
    state = {
        contacts: null,
        user: 'anu@anu.com',
    }
    componentDidMount() {
        this.listenForItems()
    }

    listenForItems() {
        db.collection('users').doc(this.props.navigation.state.params.user).collection('contacts')
            .onSnapshot(
                snap => {
                    let contacts = [];
                    snap.forEach((doc) => {
                        contacts.push({ email: doc.data().email, name: doc.data().name })
                    })
                    this.setState({ contacts })
                });
                
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>

                <Button title="Add Contact" onPress={() => navigate("AddContact", { user: this.props.navigation.state.params.user })} />
                
                <ScrollView>
                    {
                        this.state.contacts
                            ?
                            this.state.contacts.map(
                                contact =>
                                    <TouchableOpacity key={contact.email} onPress={() => navigate("Messages", { user: this.props.navigation.state.params.user, to: contact.email, contactname: contact.name })}>
                                        <View style={styles.contactContainer}>
                                            <View style={{ flexDirection: 'column', flex: 0.2 }}>
                                                {/* <Image source={require('./mycontact.png')} style={{ width: 35, height: 35, margin: 0 }} /> */}
                                                <UserImage user={contact.email} style={{ width: 35, height: 35 }} />

                                            </View>
                                            <View style={{ flexDirection: 'column', flex: 0.6, justifyContent: 'center' }}>
                                                <Text style={styles.contactContainerTxt}>
                                                    {contact.name}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', flex: 0.2 }}>
                                                {/* <Image source={require('./right.png')} style={{ width: 30, height: 30, margin: 0 }} /> */}
                                            </View>

                                        </View>
                                    </TouchableOpacity>

                            )
                            :
                            <Text>Loading...</Text>
                    }
                </ScrollView>


                <View style={styles.bottomContainer}>
                    <View style={{ flexDirection: 'column', marginRight: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.contactContainerTxt}>Status</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', marginRight: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.contactContainerTxt}>Favorites</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', marginRight: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.contactContainerTxt}>My Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', marginRight: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.contactContainerTxt}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    } s
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    contactContainer: {
        padding: 15,
        borderColor: '#EAEDED',
        borderWidth: 2,
        backgroundColor: '#F2F3F4',
        width: 400,
        justifyContent: 'center',
        flexDirection: 'row'

    },
    contactContainerTxt: {
        fontSize: 16,
        color: 'black',
        fontWeight: "500"
    },
    bottomContainer: {
        padding: 10,
        borderColor: '#EAEDED',
        borderWidth: 2,
        backgroundColor: '#F2F3F4',
        width: 400,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row'

    }

});
