import React from 'react';
import { StyleSheet,Image } from 'react-native';
import db from './db'
import firebase from 'firebase'


export default class AdImage extends React.Component {
    state={
        image: ''
    }

    async componentDidMount(){
        const image = await firebase.storage().ref('ads/' +this.props.user +'.jpg' ).getDownloadURL()
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
            <Image 
                style={{ width: 300, height: 150}}
                source={require('./images/ad-banner.jpg')}
            />
        )
            }
}