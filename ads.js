import React from 'react';
import { Button, View, Text } from 'react-native';
import db from './db'
import AdsImage from './adsImage'

export default class Ads extends React.Component {

    state = {
        ads: null,
        num:0
    }

    async componentDidMount() {

        const setListener = await db.collection('ads').doc(this.props.userinfo.location).collection('ads').where('gender','==',this.props.userinfo.gender)
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
                    let num = Math.random() * (ads.length - 0) + 0;
                    num = Math.floor(num);
                    console.log(num)
                    this.setState({ ads, num })
                })
        

    }

    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <Text> Screen 1 </Text>
                <Text> {this.props.userinfo.location} {this.props.userinfo.gender} {this.props.userinfo.age}</Text> */}
                {
                    
                    this.state.ads
                        ?
                        // <Text>{this.state.ads[this.state.num].name}</Text>
                        <AdsImage user={this.state.ads[this.state.num].name}/>
                        
                        :
                        <Text>loading ad</Text>
                }

            </View>
        );
    }
}