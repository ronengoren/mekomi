import React, {Component} from 'react';
import {Keyboard, View, Text} from 'react-native';

// Our custom files and classes import

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import MenuSide from './MenuSide';
const Drawer = createDrawerNavigator();

class SideMenuDrawer extends Component {
  render() {
    return <MenuSide {...props}></MenuSide>;
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <SideMenuDrawer {...props} navigation={navigation} />;
}
