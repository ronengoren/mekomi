import React, {Component} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  View,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body,
  Title,
  List,
  ListItem,
  Thumbnail,
  Grid,
  Col,
} from 'native-base';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import {ETSY_API_KEY} from '@env';

const apiUrl =
  'https://openapi.etsy.com/v2/guests/dnwmb0z1log9d/carts?api_key=';
const filterApi =
  '&fields=title,url,price,currency_code,tags&limit=100&includes=MainImage,Images';
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  fetchApi() {
    var thisthis = this;

    axios
      .get(apiUrl + ETSY_API_KEY + filterApi)
      .then(function (response) {
        thisthis.setState({etsyApiData: response.data.results});
        // thisthis.apiCall(response);
        // handle success

        console.log(thisthis.state.etsyApiData.Images);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    });
  }

  render() {
    const {navigation} = this.props;

    var left = (
      <Left style={{flex: 1}}>
        <Button transparent onPress={() => this.props.navigation.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} title="MY CART" />
        {this.state.cartItems.length <= 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="ios-cart"
              size={38}
              style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}}
            />
            <Text style={{color: '#95a5a6'}}>Your cart is empty</Text>
          </View>
        ) : (
          <Content style={{paddingRight: 10}}>
            <List>{this.renderItems()}</List>
            <Grid style={{marginTop: 20, marginBottom: 10}}>
              <Col style={{paddingLeft: 10, paddingRight: 5}}>
                <Button
                  onPress={() => this.checkout()}
                  style={{backgroundColor: Colors.navbarBackgroundColor}}
                  block
                  iconLeft>
                  <Icon name="ios-card" />
                  <Text style={{color: '#fdfdfd'}}>Checkout</Text>
                </Button>
              </Col>
              <Col style={{paddingLeft: 5, paddingRight: 10}}>
                <Button
                  onPress={() => this.removeAllPressed()}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.navbarBackgroundColor,
                  }}
                  block
                  iconRight
                  transparent>
                  <Text style={{color: Colors.navbarBackgroundColor}}>
                    Emtpy Cart
                  </Text>
                  <Icon
                    style={{color: Colors.navbarBackgroundColor}}
                    name="ios-trash-outline"
                  />
                </Button>
              </Col>
            </Grid>
          </Content>
        )}
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i + 1}
          onPress={() => this.itemClicked(item)}>
          <Thumbnail
            square
            style={{width: 110, height: 90}}
            source={{uri: item.image}}
          />
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.quantity > 1 ? item.quantity + 'x ' : null}
              {item.title}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
              {item.price}
            </Text>
            <Text style={{fontSize: 14, fontStyle: 'italic'}}>
              Color: {item.color}
            </Text>
            <Text style={{fontSize: 14, fontStyle: 'italic'}}>
              Size: {item.size}
            </Text>
          </Body>
          <Right>
            <Button
              style={{marginLeft: -25}}
              transparent
              onPress={() => this.removeItemPressed(item)}>
              <Icon
                size={30}
                style={{fontSize: 30, color: '#95a5a6'}}
                name="ios-remove-circle-outline"
              />
            </Button>
          </Right>
        </ListItem>,
      );
    });
    return items;
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remove ' + item.title,
      'Are you sure you want this item from your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item)},
      ],
    );
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.cartItems.map((item) => {
      if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
        items.push(item);
    });
    this.setState({cartItems: items});
    AsyncStorage.setItem('CART', JSON.stringify(items));
  }

  removeAllPressed() {
    Alert.alert('Empty cart', 'Are you sure you want to empty your cart ?', [
      {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => this.removeAll()},
    ]);
  }

  removeAll() {
    this.setState({cartItems: []});
    AsyncStorage.setItem('CART', JSON.stringify([]));
  }

  checkout() {
    const {navigation} = this.props;

    this.props.navigation.navigate('Checkout', {
      cartItems: this.state.cartItems,
    });
  }

  itemClicked(item) {
    const {navigation} = this.props;

    this.props.navigation.navigate('Product', {
      product: item,
    });
  }
}

const styles = {
  title: {
    fontFamily: 'Roboto',
    fontWeight: '100',
  },
};

export default function (props) {
  const navigation = useNavigation();

  return <Cart {...props} navigation={navigation} />;
}
