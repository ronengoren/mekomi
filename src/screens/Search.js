import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
  Header,
  Body,
  Icon,
  Item,
  Input,
  Thumbnail,
  Button,
  Right,
  Grid,
  Col,
  Left,
} from 'native-base';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Product from '../components/Product';
import Navbar from '../components/Navbar';

import {useNavigation, StackActions} from '@react-navigation/native';
import axios from 'axios';
import {ETSY_API_KEY} from '@env';

const apiUrl =
  'https://openapi.etsy.com/v2/shops/21891901/listings/featured/?api_key=';
const filterApi =
  '&fields=description,product_id,listing_id,title,url,price,currency_code,tags&limit=100&includes=MainImage,Images';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      items: [],
      etsyApiData: [],
    };
  }

  // UNSAFE_componentWillMount() {
  //   if (this.props.searchText) {
  //     this.setState({items: this.props.searchText});
  //     this.search(this.props.searchText);
  //   }
  // }

  componentDidMount() {
    this.fetchApi();
  }
  fetchApi() {
    var thisthis = this;

    axios
      .get(apiUrl + ETSY_API_KEY + filterApi)
      .then(function (response) {
        thisthis.setState({etsyApiData: response.data.results});
        // thisthis.apiCall(response);
        // handle success
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
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => navigation.pop()} dark transparent>
          <Icon name="ios-arrow-back" style={{color: 'white'}} />
        </Button>
      </Left>
    );
    const {navigation} = this.props;
    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} title="Featured items" />

        {/* <Header
          searchBar
          rounded
          style={{backgroundColor: Colors.navbarBackgroundColor}}
          backgroundColor={Colors.navbarBackgroundColor}
          androidStatusBarColor={Colors.statusBarColor}
          noShadow={true}> */}
        {/* <Item> */}
        {/* <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name="ios-close" size={32} style={{fontSize: 32}} />
            </Button> */}
        {/* <Input
              placeholder="Search..."
              value={this.state.searchText}
              onChangeText={(text) => this.onChangeText(text)}
              onSubmitEditing={() => this.search(this.state.searchText)}
              style={{marginTop: 9}}
            /> */}
        {/* <Icon
              name="ios-search"
              onPress={() => this.search(this.state.searchText)}
            /> */}
        {/* </Item> */}
        {/* </Header> */}
        {this.state.items.length <= 0 ? (
          <Content padder>{this.renderResult()}</Content>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="ios-search"
              size={38}
              style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}}
            />
            <Text style={{color: '#95a5a6'}}>All products coming...</Text>
          </View>
        )}
      </Container>
    );
  }

  renderResult() {
    let items = [];
    // let stateItems = this.state.items;
    let stateItems = this.state.etsyApiData;
    // console.log(apiProducts);

    for (var i = 0; i < stateItems.length; i++) {
      if (stateItems[i]) {
        items.push(
          // console.log(stateItems[i]),

          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            {/* <Product key={stateItems[i].id} product={stateItems[i]} isRight /> */}
          </Grid>,
        );
      } else {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>,
        );
      }
    }
    return items;
  }

  onChangeText(text) {
    this.setState({searchText: text});
  }

  search(text) {
    let productsList = this.state.etsyApiData;
    if (text) {
      // console.log(tagsArray);
      const newData = productsList.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        console.log(itemData == textData);

        return itemData == textData;
      });
    }
    // this.setState({items: searchResult});
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Search {...props} navigation={navigation} />;
}
