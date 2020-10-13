import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
  Left,
  Right,
  Button,
  Icon,
  Grid,
  Col,
} from 'native-base';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import {
  useNavigation,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
import axios from 'axios';
import {ETSY_API_KEY} from '@env';

const apiUrl =
  'https://openapi.etsy.com/v2/shops/21891901/listings/active/?api_key=';
const filterApi =
  '&fields=listing_id,tags,price,title,description,url&limit=100&includes=Images,Section';
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      data: [],
      etsyApiData: [],
    };
  }

  componentDidMount = () => {
    this.fetchApi();
  };

  fetchApi() {
    var thisthis = this;

    axios
      .get(apiUrl + ETSY_API_KEY + filterApi)
      .then(function (response) {
        thisthis.setState({etsyApiData: response.data.results});
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
    var left = (
      <Left style={{flex: 1}}>
        <Button
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          transparent>
          <Icon name="ios-menu-outline" style={{color: 'white'}} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex: 1}}>
        <Button
          onPress={() => this.props.navigation.navigate('Search')}
          transparent>
          <Icon name="ios-star-outline" style={{color: '#FFD700'}} />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('WishList')}
          transparent>
          <Icon name="ios-heart-outline" style={{color: 'red'}} />
        </Button>
      </Right>
    );

    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar
          left={left}
          right={right}
          title={this.props.route.params.title}
        />
        <Content padder>{this.renderProducts()}</Content>
      </Container>
    );
  }

  renderProducts() {
    let items = [];
    // let stateItems = this.state.items;
    let category = this.props.route.params.title.toLocaleLowerCase();
    let stateItems = this.state.etsyApiData;
    for (var i = 0; i < stateItems.length; i++) {
      if (stateItems[i].tags.includes(category)) {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].listing_id} product={stateItems[i]} />
            {/* <Product key={stateItems[i].id} product={stateItems[i]} isRight /> */}
          </Grid>,
        );
      }
    }

    return items;
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Category {...props} navigation={navigation} />;
}
