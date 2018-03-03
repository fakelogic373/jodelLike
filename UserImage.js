import React from 'react';
import { StyleSheet,Image } from 'react-native';
import db from './db'
import firebase from 'firebase'


export default class UserImage extends React.Component {
    state={
        image: ''
    }

    async componentDidMount(){
        const image = await firebase.storage().ref('images/' +this.props.user ).getDownloadURL()
        this.setState({image})

    }

    render(){
        return (
            this.state.image
            ?
            <Image 
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{uri: this.state.image}}
            />
            :
            <Image 
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={require('./images/default.gif')}
            />
        )
            }
}