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

const apiKey = 'cp66loboji5xzfdt54z1c4ux';
const apiUrl =
  'https://openapi.etsy.com/v2/shops/21891901/listings/active/?api_key=';
const filterApi =
  '&fields=title,url,price,currency_code,description,tags&limit=100&includes=MainImage';
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
      .get(apiUrl + apiKey + filterApi)
      .then(function (response) {
        thisthis.setState({etsyApiData: response.data.results});
        // thisthis.apiCall(response);
        // handle success

        // console.log(thisthis.state.etsyApiData);
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
    var productsjson = [
      {
        MainImage: {
          blue: null,
          brightness: null,
          creation_tsz: null,
          full_height: null,
          full_width: null,
          green: null,
          hex_code: null,
          hue: null,
          is_black_and_white: null,
          listing_id: 804130566,
          listing_image_id: 2388252951,
          rank: null,
          red: null,
          saturation: null,
          url_170x135:
            'https://i.etsystatic.com/21891901/d/il/c950fe/2388252951/il_170x135.2388252951_6cqu.jpg?version=0',
          url_570xN:
            'https://i.etsystatic.com/21891901/r/il/c950fe/2388252951/il_570xN.2388252951_6cqu.jpg',
          url_75x75:
            'https://i.etsystatic.com/21891901/d/il/c950fe/2388252951/il_75x75.2388252951_6cqu.jpg?version=0',
          url_fullxfull:
            'https://i.etsystatic.com/21891901/r/il/c950fe/2388252951/il_fullxfull.2388252951_6cqu.jpg',
        },
        currency_code: 'USD',
        description: 'Jerusalem skyline - hand-drawn digital print',
        is_vintage: false,
        price: '85.00',
        sku: [
          '5ED52F9CAA6AA_10751',
          '5ED52F9CAA6AA_10749',
          '5ED52F9CAA6AA_10750',
          '5ED52F9CAA6AA_1350',
          '5ED52F9CAA6AA_3',
          '5ED52F9CAA6AA_4',
        ],
        tags: [
          'Jerusalem skyline',
          'digital hand drawn',
          'design art',
          'urban storyline',
          'world cities',
          'Israel geography',
          'Illustration',
          'mekomi',
          'unique',
          'digital print',
          'museum quality',
          'paper poster',
          'Minimalist',
        ],
        title: 'Jerusalem skyline - Framed poster',
        url:
          'https://www.etsy.com/listing/804130566/jerusalem-skyline-framed-poster?utm_source=mekomi&utm_medium=api&utm_campaign=api',
      },
    ];
    var products = [
      {
        id: 1,
        title: 'Black Hat',
        categoryId: 5,
        categoryTitle: 'PRINTS',
        price: '$22',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 2,
        title: 'V Neck T-Shirt',
        categoryId: 2,
        categoryTitle: 'CLOTHING',
        price: '$12',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 10,
        title: 'Black Leather Hat',
        categoryId: 1,
        categoryTitle: 'BAGS',
        price: '$2',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 15,
        title: 'Long Sleeves T-Shirt',
        categoryId: 5,
        categoryTitle: 'PRINTS',
        price: '$120',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_100,y_50/v1500465308/pexels-photo-500034_uvxwcq.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 11,
        title: 'Pink Diamond Watch',
        categoryId: 5,
        categoryTitle: 'PRINTS',
        price: '$22',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 22,
        title: 'Golden Tie',
        categoryId: 2,
        categoryTitle: 'CLOTHING',
        price: '$12',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 100,
        title: 'Black Pearl Earrings',
        categoryId: 1,
        categoryTitle: 'BAGS',
        price: '$2',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,g_center,h_250/v1500465307/pexels-photo-262226_kbjbl3.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 215,
        title: 'Grey Blazer',
        categoryId: 5,
        categoryTitle: 'PRINTS',
        price: '$120',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 12,
        title: 'Mirror Sunglasses',
        categoryId: 5,
        categoryTitle: 'PRINTS',
        price: '$22',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250/v1500465307/pexels-photo-488541_s0si3h.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 29,
        title: 'White Shirt',
        categoryId: 2,
        categoryTitle: 'CLOTHING',
        price: '$12',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
      {
        id: 16,
        title: 'Tie',
        categoryId: 1,
        categoryTitle: 'BAGS',
        price: '$2',
        image:
          'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg',
        description: "Hello there, i'm a cool product with a heart of gold.",
      },
    ];
    let category = this.props.route.params.title;
    let data = [];
    // console.log(category);
    // console.log(products);

    // console.log(data);

    data = products.filter(function (item) {
      return item.categoryTitle == category;
    });

    // console.log(data);

    this.setState({items: data});
    this.setState({data: products});
  }

  render() {
    const {navigation} = this.props;

    var left = (
      <Left style={{flex: 1}}>
        <Button
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          dark
          transparent>
          <Icon name="ios-menu-outline" />
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
}

export default function (props) {
  const navigation = useNavigation();

  return <Category {...props} navigation={navigation} />;
}
