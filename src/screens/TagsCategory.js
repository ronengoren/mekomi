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
  '&fields=listing_id,tags,price,title,description&limit=100&includes=MainImage,Images,Section';
class TagsCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      data: [],
      etsyApiData: [],
    };
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
          <Icon name="ios-star-outline" style={{color: 'white'}} />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('WishList')}
          transparent>
          <Icon name="ios-heart-outline" style={{color: 'white'}} />
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
    let tagParams = this.props.route.params.product;
    let productCount = tagParams.active_listing_count;
    for (var i = 0; i < productCount; i++) {
      items.push(
        <Grid key={i}>
          <Product
            key={tagParams.Listings[i].listing_id}
            product={tagParams.Listings[i]}
          />
        </Grid>,
      );
    }

    return items;
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <TagsCategory {...props} navigation={navigation} />;
}
