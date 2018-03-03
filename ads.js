import React from 'react';
import { Button, View, Text } from 'react-native';
import db from './db'


export default class Ads extends React.Component {

    state = {
        ads: null
    }

    async componentDidMount() {

        const setListener = await db.collection('ads').doc(this.props.userinfo.location).collection('ads')
            .onSnapshot(
                snap => {
                    let ads = []
                    snap.forEach(
                        doc =>
                            ads.push({
                                id: doc.id,
                                name: doc.data().name,
                                age: doc.data().age,
                            })
                    )
                    console.log("ads =" + ads)
                    this.setState({ ads })
                })
    }

    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink' }}>
                <Text> Screen 1 </Text>
                <Text> {this.props.userinfo.location} {this.props.userinfo.gender} {this.props.userinfo.age}</Text>
                {
                    
                    this.state.ads
                        ?
                        <Text>{this.state.ads[1].name}</Text>
                        :
                        <Text>loading ad</Text>
                }

            </View>
        );
    }
}