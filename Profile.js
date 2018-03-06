import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Login from './Login'
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';
import db from './db'
import UserImage from './UserImage'

const Item = Aziz.Picker.Item;

export default class App extends React.Component {

    static navigationOptions = {
        title: 'Profile',
    };

    state = {
        email: '',
        password: '',
        age: '44',
        gender: '',
        location: '',
        passwordConfirm: '',
        image: null,
        user: null
    }

    componentDidMount() {

        this.setState({
            age: this.props.navigation.state.params.userinfo.age,
            gender: this.props.navigation.state.params.userinfo.gender,
            location: this.props.navigation.state.params.userinfo.location
        })


    }

    listenForItems() {
        const userinfoRef = db.collection('users').doc(this.props.navigation.state.params.user)

        userinfoRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document dataX:", doc.data());
                this.setState({
                    age: doc.data().age
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });



    }

    onValueChange2(value) {
        this.setState({
            gender: value
        });
    }

    handleRegister = async () => {
        db.collection("users").doc(this.props.navigation.state.params.user).set({
            age: this.state.age,
            gender: this.state.gender,
            location: this.state.location
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        if (this.state.image) {
            const result = await uploadImage(this.props.navigation.state.params.user)
        }

        Alert.alert("Profile has been updated")

    }

    async handlePickImage() {
        this.setState({ image: await pickImage() })
    }

    handleChangePage = () => {
        this.setState({ flag: false })
    }

    render() {
        return (

            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>
                    <Aziz.Form>

                        <UserImage user={this.props.navigation.state.params.user} />


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Age</Aziz.Label>
                            <Aziz.Label >{this.state.age}</Aziz.Label>
                            <Aziz.Input onChangeText={age => this.setState({ age })} />
                        </Aziz.Item>

                        <Aziz.Label> Gender</Aziz.Label>
                        <Aziz.Label >{this.state.gender}</Aziz.Label>


                        <Aziz.Form>
                            <Aziz.Picker
                                mode="dropdown"
                                placeholder="Select One"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Item label="Male" value="Male" />
                                <Item label="Female" value="Female" />
                            </Aziz.Picker>
                        </Aziz.Form>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Location</Aziz.Label>
                            <Aziz.Label >{this.state.location}</Aziz.Label>
                            <Aziz.Input onChangeText={location => this.setState({ location })} />
                        </Aziz.Item>





                        <View style={{ paddingTop: 30, paddingRight: 80, paddingLeft: 80 }}>
                            <Aziz.Button onPress={() => this.handlePickImage()} bordered info iconLeft>
                                <Aziz.Icon name='ios-images' />
                                <Aziz.Text>Choose an Image     </Aziz.Text>
                            </Aziz.Button>
                        </View>

                        <View style={{ padding: 40 }}>
                            <Aziz.Button onPress={() => this.handleRegister()} block success iconLeft>
                                <Aziz.Icon name='person' />
                                <Aziz.Text>Update profile</Aziz.Text>
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
    Login: {
        fontSize: 20,
        margin: 50,
        borderRadius: 70,
        borderWidth: 2,
        padding: 25,
    },
    Register: {
        margin: 30,
        borderRadius: 20,
        borderWidth: 1.5,
        padding: 15,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#C6F0FF',
        alignItems: 'center',
    },
    forBoxes: {
        borderRadius: 10,
        borderRadius: 5,
        width: 200,
        borderWidth: 1,
        height: 30,
        padding: 3,
        margin: 5
    }
});