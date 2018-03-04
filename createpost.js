import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import Register from './Register'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';
import db from './db'

export default class CreatePost extends React.Component {

    state = {
        content: '',
        location: '',
        content: '',
        type: '',
        date: '',
        image: null
    }


    async handlePickImage() {
        this.setState({ image: await pickImage() })
    }




    async handleSend() {

        if (this.state.image) {
            // const result = await uploadImage(this.state.image, 'test01')
        }



        await db.collection('posts').doc(this.props.navigation.state.params.userinfo.location).collection('posts').add({
            owner: this.props.navigation.state.params.user,
            location: this.props.navigation.state.params.userinfo.location,
            type: 'text',
            date: new Date(),
            content: this.state.content
        })


        if (this.state.image) {
        const setListener = await db.collection('posts').doc(this.props.navigation.state.params.userinfo.location).collection('posts').orderBy("date", "desc").limit(1).onSnapshot(
            snap => {
                let posts = []
                snap.forEach(
                    doc =>
                        posts.push({
                            id: doc.id,
                            owner: doc.data().owner,
                            date: doc.data().date,
                            type: doc.data().type,
                            content: doc.data().content,
                        })
                )
                console.log("Data = " + posts[0].id + ":: " + posts[0].content)
                    this.uploading(posts[0].id);
                
            })
        }


        this.props.navigation.goBack();
    }

    async uploading(id) {

        const result = await uploadImage(this.state.image, id)

    }

    render() {
        return (

            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>

                    <Aziz.Form>


                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Send a message here</Aziz.Label>
                            <Aziz.Input onChangeText={content => this.setState({ content })} />
                        </Aziz.Item>

                        <View style={{ paddingTop: 30, paddingRight: 80, paddingLeft: 80 }}>
                            <Aziz.Button onPress={() => this.handlePickImage()} bordered info iconLeft>
                                <Aziz.Icon name='ios-images' />
                                <Aziz.Text>Choose an Image   </Aziz.Text>
                            </Aziz.Button>
                        </View>



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
