import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Messages from './Messages.js'
import Contacts from './Contacts'
import PostsList from './PostsList'



export default TabNavigator({
  Home: { screen: PostsList },
  Settings: { screen: Contacts },
});