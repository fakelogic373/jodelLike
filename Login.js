
import React from 'react';

import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView } from 'react-native';

import * as firebase from 'firebase';

import 'firebase/firestore';
import Messages from './Messages'
import db from './db'
import ImagePicker from 'react-native-image-picker'

import { pickImage, uploadImage } from './ImageUtils'




export default class Login extends React.Component {

    state = {
        password: '',
        password2: '',
        email: '',
        image: null

    }

    async handleLogin() {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        //dont need user now nut lister will be triggred
        if (this.state.image) {
            const result = await uploadImage(this.state.image, user.email)
        }

    }



    async handleRegister() {
        if (this.state.password2 == this.state.password) {
            if (!this.state.image) {
                this.setState({ image: await this.pickImage() })
            }
            const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            if (this.state.image) {
                const result = await uploadImage(this.state.image, user.email)
            }
        }
    }

    // handlePickImage(){
    //     // More info on all the options is below in the README...just some common use cases shown here
    //     var options = {
    //         title: 'Select Avatar',
    //         customButtons: [
    //         {name: 'fb', title: 'Choose Photo from Facebook'},
    //         ],
    //         storageOptions: {
    //         skipBackup: true,
    //         path: 'images'
    //         }
    //     };

    async handlePickImage() {
        this.setState({ image: await pickImage() })
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    // ImagePicker.showImagePicker(options, (response) => {
    //     console.log('Response = ', response);

    //     if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //     }
    //     else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     }
    //     else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     }
    //     else {
    //         let source = { uri: response.uri };

    //         // You can also display the image using data:
    //         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    //         this.setState({
    //             avatarSource: source
    //         });
    //     }
    // });
    // }




render() {

    return (
        <View style={styles.container}>


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <TextInput style={{ borderRadius: 4, borderWidth: 0.5, width: 100, margin: 10 }}
                    placeholder="Email"

                    value={this.state.email}
                    // onChange={email => this.setState({ email : this.state.email})}
                    onChangeText={email => this.setState({ email })}
                />


                <TextInput style={{ borderRadius: 4, borderWidth: 0.5, width: 100 }}
                    placeholder="Password"
                    secureTextEntry

                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Button
                    onPress={() => this.handleLogin()}
                    title="Login"
                />

            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <TextInput
                    placeholder="Password2"
                    value={this.state.password2}
                    onChangeText={password2 => this.setState({ password2 })}
                />

                <Button
                    onPress={() => this.handlePickImage()}
                    title="pick image"
                />

                <Button
                    onPress={() => this.handleRegister()}
                    title="Register"
                />

            </View>






        </View>
    )
}
}



const styles =
    StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        item: {
            padding: 10,
            fontSize: 10,
            width: 300
        }

    });
