import React from 'react';
import { StyleSheet,Image,Text } from 'react-native';
import db from './db'
import firebase from 'firebase'


export default class PostImage extends React.Component {
    state={
        image: ''
    }

    async componentDidMount(){
        const image = await firebase.storage().ref('images/' +this.props.postId ).getDownloadURL()
        this.setState({image})

    }

    render(){
        return (
            this.state.image
            ?
            <Image 
                style={{ width: 300, height: 150 }}
                source={{uri: this.state.image}}
            />
            :
            <Text>Loading..</Text>
        )
            }
}