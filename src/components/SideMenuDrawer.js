import React, {Component} from 'react';
import {Keyboard, View, Text} from 'react-native';

// Our custom files and classes import

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

class SideMenuDrawer extends Component {
  render() {
    return (
      <View>
        <Text>SideMenuDrawer</Text>
      </View>
      // <Drawer.Navigator>
      //   <Drawer.Screen name="SideMenu" component={SideMenu} />
      // </Drawer.Navigator>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <SideMenuDrawer {...props} navigation={navigation} />;
}
