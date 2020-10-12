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
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {ETSY_API_KEY} from '@env';
import Product from './Product';

const apiUrl = 'https://openapi.etsy.com/v2/shops/21891901/sections/?api_key=';
const filterApi =
  '&includes=Listings:active/Images&fields=shop_section_id,title,active_listing_count&limit=100';
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
      sectionData: [],
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount() {
    this._isMounted = true;

    this.fetchApi();
  }

  UNNSAFE_componentWillUnmount() {
    this._isMounted = false;
  }
  fetchApi() {
    var thisthis = this;

    axios
      .get(apiUrl + ETSY_API_KEY + filterApi)
      .then(function (response) {
        thisthis.setState({sectionData: response.data.results});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView style={styles.container}>{this.renderMenu()}</ScrollView>
    );
  }
  renderMenu() {
    if (!this.state.subMenu) {
      return (
        <View>
          {/* <View style={{paddingLeft: 15, paddingRight: 15}}>
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
                name="ios-star-outline"
                onPress={() => this.search()}
              />
            </Item>
          </View> */}
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
                    this.props.navigation.navigate('WebView', {
                      url: 'https://www.facebook.com/MekomiUS',
                    })
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="logo-instagram"
                  onPress={() =>
                    this.props.navigation.navigate('WebView', {
                      url: 'https://www.instagram.com/mekomi_urbanstoryline/',
                    })
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="ios-globe"
                  onPress={() =>
                    this.props.navigation.navigate('WebView', {
                      url: 'https://www.guymizrachy.com',
                    })
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="ios-musical-notes"
                  onPress={() =>
                    this.props.navigation.navigate('WebView', {
                      url:
                        'https://open.spotify.com/user/12165756219?si=3L-MVePtSTq5E4ztj45KZQ',
                    })
                  }
                />
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Icon
                  style={{fontSize: 18}}
                  name="md-logo-pinterest"
                  onPress={() =>
                    this.props.navigation.navigate('WebView', {
                      url: 'https://www.pinterest.com/guymiz/_saved/',
                    })
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
    const {navigation} = this.props;
    const mainDrawer = this.state.sectionData;
    let items = [];

    for (let i = 0; i < mainDrawer.length; i++) {
      items.push(
        <ListItem
          last={mainDrawer.length === i + 1}
          icon
          key={mainDrawer[i].shop_section_id}
          button={true}
          onPress={() => this.itemClicked(mainDrawer[i])}>
          <Body>
            <Text>{mainDrawer[i].title}</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>,
      );
    }

    return items;
  }
  itemClicked(item) {
    const {navigation} = this.props;

    var tagSection = [];

    let stateItems = this.state.sectionData;

    this.props.navigation.navigate('TagsCategory', {
      title: item.title,
      product: item,
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
