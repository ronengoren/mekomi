import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Text from '../components/Text';
import Navbar from '../components/Navbar';

import CategoryBlock from '../components/CategoryBlock';
import RedThreadBlock from '../components/RedThreadBlock';

import {
  Container,
  Content,
  View,
  Button,
  Left,
  Right,
  Icon,
  Card,
  CardItem,
  cardBody,
} from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Product from '../components/Product';
import {NavigationActions, withNavigation} from '@react-navigation/compat';
import {DrawerActions} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import axios from 'axios';
import {ETSY_API_KEY} from '@env';

const apiUrl =
  'https://openapi.etsy.com/v2/shops/21891901/listings/active/?api_key=';
const filterApi = '&limit=100&includes=MainImage,Images,Section';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: '',
      categories: [],
      results: [],
    };
  }

  componentDidMount() {
    // this.fetchApi();
  }

  fetchApi() {
    var thisthis = this;

    axios
      .get(apiUrl + ETSY_API_KEY + filterApi)
      .then(function (response) {
        const result = response.data.results;
        thisthis.setState({results: result});
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
        <Button onPress={() => this.props.navigation.openDrawer()} transparent>
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
      <Container>
        <Navbar left={left} right={right} title="MEKOMI" />
        <Content>
          {this.renderCategories()}
          <RedThreadBlock
            key={1}
            id={1}
            image={
              'https://static.wixstatic.com/media/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg/v1/fill/w_1960,h_1180,al_c,q_85,usm_0.66_1.00_0.01/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg'
            }
            title="Red Thread Bags"
          />
        </Content>
      </Container>
    );
  }
  renderCategories() {
    var products = this.state.results;
    this.state.results = this;
    var categ = [];

    const categories = [
      {
        id: 1,
        title: 'PRINT',
        image: 'https://media.giphy.com/media/HojvSeAFQbUbeq8sHq/giphy.gif',
      },
      {
        id: 2,
        title: 'CLOTHING',
        image:
          'https://f.i.etsystatic.com/21891901/r/il/8912bd/2221078736/il_1588xN.2221078736_fpc0.jpg',
      },

      {
        id: 3,
        title: 'HOME',
        image:
          'https://f.i.etsystatic.com/21891901/r/il/9fd894/2135706324/il_794xN.2135706324_51bw.jpg',
      },
      {
        id: 4,
        title: 'ACCESSORIES',
        image:
          'https://f.i.etsystatic.com/21891901/r/il/9fde17/2227997747/il_1588xN.2227997747_i4kr.jpg',
      },
    ];
    let cat = [];
    for (var i = 0; i < categories.length; i++) {
      cat.push(
        <CategoryBlock
          key={categories[i].id}
          id={categories[i].id}
          image={categories[i].image}
          title={categories[i].title}
        />,
      );
    }

    return cat;
  }
}

const redThreadCategories = [
  {
    id: 1,
    title: 'BAGS',
    image:
      'https://static.wixstatic.com/media/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg/v1/fill/w_1960,h_1180,al_c,q_85,usm_0.66_1.00_0.01/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg',
  },
];

export default withNavigation(Home);
