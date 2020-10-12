import 'react-native-gesture-handler';
import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import SideMenuSecondLevel from '../components/SideMenuSecondLevel';
import {Root, Thumbnail} from 'native-base';
import {
  View,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Item,
  Input,
  Button,
  Grid,
  Col,
} from 'native-base';

import WishList from '../screens/WishList';
import Map from '../screens/Map';
import Contact from '../screens/Contact';
import TagsCategory from '../screens/TagsCategory';

import Newsletter from '../screens/Newsletter';
import Category from '../screens/Category';
import Product from '../screens/Product';
import ImageGallery from '../screens/ImageGallery';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Checkout from '../screens/Checkout';
import WebView from '../screens/WebView';

// import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import TopPicksScreen from '../screens/TopPicksScreen';
import SideMenuDrawer from '../components/SideMenuDrawer';
import MenuSide from '../components/MenuSide';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const Stack = createStackNavigator();

const HomeStack = createStackNavigator();

const DrawerStack = createStackNavigator();

function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <MenuSide {...props} />
    </DrawerContentScrollView>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="WishList"
        component={WishList}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Newsletter"
        component={Newsletter}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="TagsCategory"
        component={TagsCategory}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ImageGallery"
        component={ImageGallery}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="WebView"
        component={WebView}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App({navigation, route}) {
  return (
    <Root>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          backBehavior="initialRoute"
          drawerContent={(props) => (
            <DrawerContent {...props} navigationProps={navigation} />
          )}>
          <Drawer.Screen name="Home" component={HomeStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Root>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
