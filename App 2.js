
import React
  from 'react';

import { StyleSheet, Text, View, Image, TextInput, Button }
  from 'react-native';

import *
  as firebase
  from 'firebase';

import 'firebase/firestore';



// var config = {


//   apiKey: "AIzaSyBuNl20JiLpWhaXyLr-f8qvJHcqWVxiFeU",
//   authDomain: "project01-53a6a.firebaseapp.com",
//   databaseURL: "https://project01-53a6a.firebaseio.com",
//   projectId: "project01-53a6a",
//   storageBucket: "project01-53a6a.appspot.com",
//   messagingSenderId: "810456971979"

// }

var config = {
  databaseURL: "https://project01-53a6a.firebaseio.com",
  projectId: "project01-53a6a"
}

firebase.initializeApp(config)

const db =
  firebase.firestore()



export default
  class App
  extends React.Component {

  state = {
    pets: null,
    name: '',
    age: ''

  }



  componentDidMount() {
    this.listenForItems()
  }



  listenForItems() {
    db.collection('pets').onSnapshot(
      snap => {
        let pets = []
        snap.forEach(
          doc => {
            pets.push({ id: doc.id, name: doc.data().name, age: doc.data().age });
          });
        this.setState({
          pets
        });

      });

  }

  async handleAdd(){
    console.log(this.state.name)
    console.log(this.state.age)
    await db.collection('pets').add({name: this.state.name, age: this.state.age})
  }




  render() {

    return (
      <View style={styles.container}>
        <Text>Pets !</Text>
        <TextInput
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          placeholder="Age"
          onChangeText={age => this.setState({ age })}
        />

        <Button 
          onPress={() => this.handleAdd()}
          title= "Add"
        />

        {
          this.state.pets
            ?
            this.state.pets.map(
              pet =>
                <Text style={styles.item} key={pet.id}>
                  Name: {pet.name}
                  Age: {pet.age}
                </Text>
            )

            :
            <View>
              <Text>Loading ...</Text>
            </View>
        }

      </View>
    );
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
      fontSize: 18,
      height: 44,
    }

  });
