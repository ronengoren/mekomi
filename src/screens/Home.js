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

class Home extends Component {
  render() {
    const {navigation} = this.props;

    var left = (
      <Left style={{flex: 1}}>
        <Button
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
          dark
          transparent>
          <Icon name="ios-menu-outline" iconStyle={{color: 'black'}} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex: 1}}>
        <Button
          onPress={() => this.props.navigation.navigate('Search')}
          dark
          transparent>
          <Icon name="ios-search-outline" />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('Cart')}
          dark
          transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );
    return (
      <Container>
        <Navbar left={left} right={right} title="MEKOMI" />
        <Content>{this.renderCategories()}</Content>
      </Container>
    );
  }
  renderCategories() {
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

const categories = [
  {
    id: 1,
    title: 'PRINTS',
    image:
      'https://f.i.etsystatic.com/21891901/r/il/af5d86/2413284995/il_1588xN.2413284995_dkwo.jpg',
  },
  {
    id: 2,
    title: 'CLOTHING',
    image:
      'https://f.i.etsystatic.com/21891901/r/il/8912bd/2221078736/il_1588xN.2221078736_fpc0.jpg',
  },
  {
    id: 3,
    title: 'BAGS',
    image:
      'https://static.wixstatic.com/media/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg/v1/fill/w_1960,h_1180,al_c,q_85,usm_0.66_1.00_0.01/4af896_bdd36088d56a4473bb2f9230fda387b5~mv2_d_5760_3840_s_4_2.jpg',
  },

  {
    id: 4,
    title: 'HOME',
    image:
      'https://f.i.etsystatic.com/21891901/r/il/9fd894/2135706324/il_794xN.2135706324_51bw.jpg',
  },
  {
    id: 5,
    title: 'ACCESORIES',
    image:
      'https://f.i.etsystatic.com/21891901/r/il/9fde17/2227997747/il_1588xN.2227997747_i4kr.jpg',
  },
];

export default withNavigation(Home);
