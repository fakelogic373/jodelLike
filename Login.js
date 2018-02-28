import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import Register from './Register'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';

export default class App extends React.Component {

    state = {
        email: '',
        password: ''
        // flag: true
    }
    // async handleLogin () {
    //     await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //     if (this.state.image) {
    //         const result = await uploadImage(this.state.image, user.email)
    //     }
        
    // }

    handleLogin = async () => {
        const user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        if (this.state.image) {
            const result = await uploadImage(this.state.image, user.email)
        }
        // const { navigate } = this.props.navigation
        // navigate("Contacts", {user: user.email})



        const { navigate } = this.props.navigation
        navigate("PostsList", {user: user.email})
        
    }

    handleChangePage = () => {
        this.setState({ flag: false})
    }

    render() {
        return (

            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>

                    <Aziz.Form>


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Username</Aziz.Label>

                            <Aziz.Input onChangeText={email => this.setState({ email })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Password</Aziz.Label>
                            <Aziz.Input secureTextEntry onChangeText={password => this.setState({ password })} />
                        </Aziz.Item>

                        <View style={{ padding: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Aziz.Button block success iconLeft onPress={() => this.handleLogin()}>
                                <Aziz.Icon name='person' />
                                <Aziz.Text>Login</Aziz.Text>

                            </Aziz.Button>
                        </View>

                        <View style={{ padding: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Aziz.Button block success iconLeft onPress={() => this.props.navigation.navigate('Register')}>
                                <Aziz.Text>Register </Aziz.Text>
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
