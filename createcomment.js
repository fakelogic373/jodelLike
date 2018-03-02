import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import Register from './Register'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';
import db from './db'

export default class CreateComment extends React.Component {

    state = {
        content: '',
        type: '',
        date: '',
    }

    async handleSend() {
        await db.collection('posts').doc(this.props.navigation.state.params.location).collection('posts').
            doc(this.props.navigation.state.params.id).collection('comments').add({
                username: this.props.navigation.state.params.user,
                content: this.state.content,
                date: new Date()
            })
            this.props.navigation.goBack();
    }


    render() {
        return (

            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>

                    <Aziz.Form>


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Send a comment here</Aziz.Label>
                            <Aziz.Input onChangeText={content => this.setState({ content })} />
                        </Aziz.Item>



                        <View style={{ padding: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Aziz.Button block success iconLeft onPress={() => this.handleSend()}>
                                <Aziz.Icon name='person' />
                                <Aziz.Text>Send</Aziz.Text>

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
