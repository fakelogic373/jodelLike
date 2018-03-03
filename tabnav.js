import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Messages from './Messages.js'
import Contacts from './Contacts'
import PostsList from './PostsList'
import { Ionicons } from '@expo/vector-icons'; 


export default TabNavigator({
  Posts: { screen: PostsList },
  Messages: { screen: Contacts },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Posts') {
        iconName = `ios-compass${focused ? '' : '-outline'}`;
      } else if (routeName === 'Messages') {
        iconName = `ios-contacts${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  animationEnabled: false,
  swipeEnabled: false,
}
);