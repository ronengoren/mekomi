import React, {Component} from 'react';
import {
  ScrollView,
  LayoutAnimation,
  UIManager,
  Linking,
  StyleSheet,
} from 'react-native';
import {
  View,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Icon,
  Item,
  Input,
  Button,
  Grid,
  Col,
  Text,
} from 'native-base';
import SideMenuSecondLevel from './SideMenuSecondLevel';
import * as RootNavigation from '../routes/appRouter';

var menuItems = [
  {
    id: 1,
    title: 'PRINTS',
    subMenu: [
      {
        id: 5,
        title: 'NEW IN',
      },
      {
        id: 6,
        title: 'JACKETS',
      },
      {
        id: 7,
        title: 'BLAZERS',
      },
      {
        id: 8,
        title: 'TROUSERS',
      },
      {
        id: 9,
        title: 'JEANS',
      },
      {
        id: 10,
        title: 'SHORTS',
      },
      {
        id: 11,
        title: 'SHOES',
      },
    ],
  },
  {
    id: 2,
    title: 'CLOTHING',
    subMenu: [
      {
        id: 12,
        title: 'NEW IN',
      },
      {
        id: 13,
        title: 'JACKETS',
      },
      {
        id: 14,
        title: 'BLAZERS',
      },
      {
        id: 15,
        title: 'TROUSERS',
      },
      {
        id: 16,
        title: 'JEANS',
      },
      {
        id: 17,
        title: 'SHORTS',
      },
      {
        id: 18,
        title: 'SHOES',
      },
    ],
  },
  {
    id: 3,
    title: 'BAGS',
  },
  {
    id: 4,
    title: 'ACCESORIES',
  },
  {
    id: 5,
    title: 'HOME',
  },
];

const menusSecondaryItems = [
  {
    id: 190,
    title: 'Login',
    icon: 'ios-person',
    key: 'Login',
  },
  {
    id: 519,
    title: 'Signup',
    icon: 'ios-person-add',
    key: 'Signup',
  },
  {
    id: 19,
    title: 'Wish List',
    icon: 'heart',
    key: 'Wishlist',
  },
  {
    id: 20,
    key: 'Map',
    title: 'Store Finder',
    icon: 'ios-pin',
    key: 'Map',
  },
  {
    id: 21,
    key: 'Contact',
    title: 'Contact Us',
    icon: 'md-phone-portrait',
    key: 'Contact',
  },
  {
    id: 23,
    key: 'Newsletter',
    title: 'Newsletter',
    icon: 'md-paper-plane',
    key: 'Newsletter',
  },
];
class MenuSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchError: false,
      subMenu: false,
      subMenuItems: [],
      clickedItem: '',
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render() {
    return (
      <ScrollView style={styles.container}>{this.renderMenu()}</ScrollView>
    );
  }
  renderMenu() {
    const {navigation} = this.props;
    if (!this.state.subMenu) {
      return (
        <View>
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Item error={this.state.searchError}>
              <Input
                placeholder="Search..."
                onChangeText={(text) =>
                  this.setState({search: text, searchError: false})
                }
                onSubmitEditing={() => this.search()}
              />
              <Icon
                active
                name="ios-search-outline"
                onPress={() => this.search()}
              />
            </Item>
          </View>
          <View style={{paddingRight: 15}}>
            <List>
              <ListItem
                icon
                key={0}
                button={true}
                onPress={() => RootNavigation.navigate('Home')}>
                <Body>
                  <Text>Home</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward" />
                </Right>
              </ListItem>
              {this.renderMenuItems()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Follow us</Text>
            <Grid>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-facebook"
                  onPress={() =>
                    Linking.openURL('http://www.facebook.com/').catch((err) =>
                      console.error('An error occurred', err),
                    )
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-instagram"
                  onPress={() =>
                    Linking.openURL('http://www.instagram.com/').catch((err) =>
                      console.error('An error occurred', err),
                    )
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-twitter"
                  onPress={() =>
                    Linking.openURL('http://www.twitter.com/').catch((err) =>
                      console.error('An error occurred', err),
                    )
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-youtube"
                  onPress={() =>
                    Linking.openURL('http://www.youtube.com/').catch((err) =>
                      console.error('An error occurred', err),
                    )
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-snapchat"
                  onPress={() =>
                    Linking.openURL('http://www.snapchat.com/').catch((err) =>
                      console.error('An error occurred', err),
                    )
                  }
                />
              </Col>
            </Grid>
          </View>
        </View>
      );
    } else {
      return (
        <SideMenuSecondLevel
          back={this.back.bind(this)}
          title={this.state.clickedItem}
          menu={this.state.subMenuItems}
          navigation={this.props.navigation}
        />
      );
    }
  }
  renderMenuItems() {
    let items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i + 1}
          icon
          key={item.id}
          button={true}
          onPress={() => this.itemClicked(item)}>
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>,
      );
    });
    return items;
  }
  itemClicked(item) {
    const {navigation} = this.props;

    if (!item.subMenu || item.subMenu.length <= 0) {
      this.props.navigation.navigate('Category', {
        id: item.id,
        title: item.title,
      });

      return;
    }
    var animationConfig = {
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({
      subMenu: true,
      subMenuItems: item.subMenu,
      clickedItem: item.title,
    });
  }
  back() {
    var animationConfig = {
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: false, subMenuItems: [], clickedItem: ''});
  }
  search(text) {
    const {navigation} = this.props;

    if (this.state.search.length <= 2)
      this.setState({searchError: true, search: ''});
    else
      this.props.navigation.navigate('Search', {
        searchText: this.state.search,
      });
  }
  renderSecondaryList() {
    const {navigation} = this.props;

    let secondaryItems = [];
    menusSecondaryItems.map((item, i) => {
      secondaryItems.push(
        <ListItem
          last
          icon
          key={item.id}
          button={true}
          onPress={this.props.navigation.navigate(item.key)}>
          <Left>
            <Icon style={{fontSize: 18}} name={item.icon} />
          </Left>
          <Body style={{marginLeft: -15}}>
            <Text style={{fontSize: 16}}>{item.title}</Text>
          </Body>
        </ListItem>,
      );
    });
    return secondaryItems;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10,
  },
});
export default MenuSide;
