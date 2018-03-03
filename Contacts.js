import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import db from './db'
import * as firebase from 'firebase';
import 'firebase/firestore'
import UserImage from './UserImage'
import * as Aziz from 'native-base';

export default class Contacts extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `My Contacts`,
        }
    };
    state = {
        contacts: null,
        user: '',
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
            
            <Aziz.Container>
                {/* md-person-add */}
                
                <View style={styles.container}>

                    {/* <Button title="Add a Contact"  /> */}

                    <ScrollView>
                        {
                            this.state.contacts
                                ?
                                this.state.contacts.map(
                                    contact =>
                                        <TouchableOpacity key={contact.email} onPress={() => navigate("Messages", { 
                                            user: this.props.navigation.state.params.user,
                                             to: contact.email, contactname: contact.name })}>
                                             
                                            <View style={styles.contactContainer}>
                                                <View style={{ flexDirection: 'column', flex: 0.2 }}>
                                                    <UserImage user={contact.email} />
                                                </View>

                                                <View style={{ flexDirection: 'column', flex: 0.6, justifyContent: 'center' }}>
                                                    <Text style={styles.contactContainerTxt}>
                                                        {contact.name}
                                                    </Text>
                                                </View>

                                                <View style={{ flexDirection: 'column', flex: 0.2 }}>
                                                    {/* <Image source={require('./right.png')} style={{ width: 30, height: 30, margin: 0 }} /> */}
                                                    <Aziz.Icon name="ios-return-right" />
                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                        
                                )
                                :
                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
                                    <Image style={{ width: 100, height: 100 }} source={require('./loading.gif')} />
                                </View>
                        }
                    </ScrollView>

                    <View style={{ flex: 1 }}>
                    <Aziz.Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ paddingBottom: 20}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Aziz.Icon name="ios-more" />

                        <Aziz.Button style={{ backgroundColor: '#3B5998' }} onPress={() => navigate("AddContact", { user: this.props.navigation.state.params.user })}>
                            <Aziz.Icon name="md-person-add" />
                        </Aziz.Button>

                    </Aziz.Fab>
                    </View>


                </View>
            </Aziz.Container>
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
