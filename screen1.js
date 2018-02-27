import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class Screen1 extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  state={
      arr: ['dog','cat','ferret']
  }

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Screen 1</Text>
        <Button
          title="Go to Second"
          onPress={() => this.props.navigation.navigate('Second',{
            array1: this.state.arr  
          }
        
        )}
        />
        <Button
          title="Go to third"
          onPress={() => this.props.navigation.navigate('third',{
            params : 'New Title'
          }
        
        )}
        />
      </View>
    );
  }
}