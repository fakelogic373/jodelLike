import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Login from './Login'
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';
import db from './db'

export default class App extends React.Component {

    static navigationOptions = {
        title: 'Profile',
      };

    state = {
        email: '',
        password: '',
        age: '',
        gender: '',
        location: '',
        passwordConfirm: '',
        image: null
    }

   

    handleUpdate = async () => {
        // if (this.state.password === this.state.passwordConfirm ) {
            
 
        //     // db.collection("users").doc(user.email).set({
        //     //     age: this.state.age,
        //     //     gender: this.state.gender,
        //     //     location: this.state.location
        //     // })
        //     // .then(function() {
        //     //     console.log("Document successfully written!");
        //     // })
        //     // .catch(function(error) {
        //     //     console.error("Error writing document: ", error);
        //     // });
        //     // if (this.state.image) {
        //     //     const result = await uploadImage(this.state.image, user.email)
        //     // }

        // }

        db.collection("users").doc(this.props.navigation.state.params.user).set({
            age: this.state.age,
            gender: this.state.gender,
            location: this.state.location
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        if (this.state.image) {
            const result = await uploadImage(this.state.image, user.email)
        }

        this.props.navigation.goBack();

       
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


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Age</Aziz.Label>
                            <Aziz.Label >{this.state.age}</Aziz.Label>
                            <Aziz.Input onChangeText={age => this.setState({ age })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Gender</Aziz.Label>
                            <Aziz.Input onChangeText={gender => this.setState({ gender })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Location</Aziz.Label>
                            <Aziz.Input onChangeText={location => this.setState({ location })} />
                        </Aziz.Item>

                        {/* <Aziz.Item floatingLabel>
                            <Aziz.Label>Password</Aziz.Label>
                            <Aziz.Input secureTextEntry onChangeText={password => this.setState({ password })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Confirm Password</Aziz.Label>
                            <Aziz.Input secureTextEntry onChangeText={passwordConfirm => this.setState({ passwordConfirm })} />
                        </Aziz.Item> */}

                        <View style={{ paddingTop: 30, paddingRight: 80, paddingLeft: 80 }}>
                            <Aziz.Button onPress={() => this.handlePickImage()} bordered info iconLeft>
                                <Aziz.Icon name='ios-images' />
                                <Aziz.Text>Choose an Image     </Aziz.Text>
                            </Aziz.Button>
                        </View>

                        <View style={{ padding: 40 }}>
                            <Aziz.Button onPress={() => this.handleUpdate()} block success iconLeft>
                            <Aziz.Icon name='person' />
                                <Aziz.Text>Save</Aziz.Text>
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