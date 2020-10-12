import React, {Component} from 'react';

import {
  LogBox,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  View,
  Container,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Picker,
  Item,
  Grid,
  Col,
  Toast,
  Text as NBText,
} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ETSY_API_KEY} from '@env';
// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import {default as ProductComponent} from '../components/Product';
import {WebView} from 'react-native-webview';

const apiUrl = 'https://openapi.etsy.com/v2/listings/';
const inventoryListing = '/inventory?api_key=';
const filterApi =
  '&includes=Attributes&fields=values,title,url,price,currency_code,description,tags,has_variations';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeSlide: 0,
      quantity: 1,
      selectedColor: '',
      selectedSize: '',
      carouselImages: {},
      listing: '',
      colorOption: [],
      inventory: {},
    };
  }

  UNSAFE_componentWillMount() {
    //get the product with id of this.props.product.id from your server
    // this.setState({product: dummyProduct});
  }

  componentDidMount() {
    var images = this.props.route.params.product.Images;

    let data = [];
    for (var i = 0; i < images.length; i++) {
      data.push(images[i].url_fullxfull);
      this.setState({
        carouselImages: data,
      });
    }
  }

  // renderColors() {
  //   this;
  //   let colors = [];
  //   let products = this.state.product;
  //   // console.log(this.props.route.params.product);
  //   axios
  //     .get(
  //       'https://openapi.etsy.com/v2/listings/' +
  //         this.props.route.params.product.listing_id +
  //         '/inventory?api_key=' +
  //         ETSY_API_KEY +
  //         '&includes=Attributes&fields=values,title,url,price,currency_code,description,tags,has_variations',
  //     )
  //     .then(function (response) {
  //       // this.setState({inventory: response.data.results});
  //       response.data.results.products.map((tierOne, i) => {
  //         // console.log(tierOne);
  //         // console.log(JSON.stringify(tierOne.product_id));

  //         colors.push(<Picker label={tierOne.product_id} value={i} />);
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .then(function () {});
  //   // products.products.map((y) => {
  //   //   console.log(y);
  //   // });
  //   // this.state.product.products.map((tierOne) => {
  //   //   // console.log('product_id: ' + tierOne.product_id);
  //   //   // colors.concat(tierOne.product_id);
  //   //   tierOne.property_values.map((tierTwo, i) => {
  //   //     colors.push(tierTwo.values[0]);
  //   //     this.setState({colorOption: colors});
  //   //     // <Picker.Item label="Wallet" value="key0" />;
  //   //     // console.log(tierTwo.property_name, tierTwo.values);
  //   //     // colors.push(
  //   //     //   <Picker.Item
  //   //     //     key={i}
  //   //     //     label={tierTwo.property_name}
  //   //     //     value={tierTwo.property_name}
  //   //     //   />,
  //   //     // );
  //   console.log(colors);
  //   //   });
  //   // });
  //   return colors;
  // }
  render() {
    const {navigation} = this.props;
    const {route} = this.props;
    // console.log(this.state.carouselImages);
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this.props.navigation.pop()} dark transparent>
          <Icon name="ios-arrow-back" style={{color: 'white'}} />
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
        <Navbar left={left} right={right} title={route.params.product.title} />
        <Content>
          <Carousel
            data={this.state.carouselImages}
            renderItem={this._renderItem}
            // ref={(carousel) => {
            //   this._carousel = carousel;
            // }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => this.setState({activeSlide: index})}
            enableSnap={true}
          />
          <Pagination
            dotsLength={this.state.carouselImages.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: 'transparent',
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: -15,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View
            style={{
              backgroundColor: '#fdfdfd',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 12,
              paddingRight: 12,
              alignItems: 'center',
            }}>
            <Grid>
              <Col size={3}>
                <Text style={{fontSize: 18}}>{route.params.product.title}</Text>
              </Col>
              <Col>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  ${route.params.product.price}
                </Text>
              </Col>
            </Grid>
            {/* <Grid style={{marginTop: 15}}>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Color:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a color"
                  note={true}
                  selectedValue={this.state.selectedColor}
                  onValueChange={(color) =>
                    this.setState({selectedColor: color})
                  }>
                  {this.renderColors()}
                </Picker>
              </Col>
            </Grid> */}
            {/* <Grid>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Size:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.selectedSize}
                  onValueChange={(size) => this.setState({selectedSize: size})}>
                  {this.renderSize()}
                </Picker>
              </Col>
            </Grid> */}
            {/* <Grid>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Button
                    block
                    icon
                    transparent
                    onPress={() =>
                      this.setState({
                        quantity:
                          this.state.quantity > 1 ? this.state.quantity - 1 : 1,
                      })
                    }>
                    <Icon
                      name="ios-remove"
                      style={{color: Colors.navbarBackgroundColor}}
                    />
                  </Button>
                  <View
                    style={{
                      flex: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}>
                    <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                  </View>
                  <Button
                    block
                    icon
                    transparent
                    onPress={() =>
                      this.setState({quantity: this.state.quantity + 1})
                    }>
                    <Icon
                      style={{color: Colors.navbarBackgroundColor}}
                      name="ios-add"
                    />
                  </Button>
                </View>
              </Col>
            </Grid> */}
            <Grid style={{margin: 15}}>
              <Col size={3}>
                <Button
                  onPress={this.addToCart.bind(this)}
                  style={{backgroundColor: Colors.buttonBackground}}>
                  <Text style={{color: '#fdfdfd', margin: 5}}>Buy Now</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  onPress={this.addToWishlist.bind(this)}
                  icon
                  transparent
                  style={{backgroundColor: '#fdfdfd'}}>
                  <Icon
                    style={{color: Colors.buttonBackground}}
                    name="ios-heart-outline"
                  />
                </Button>
              </Col>
            </Grid>
            <View
              style={{
                marginTop: 15,
                padding: 10,
                borderWidth: 1,
                borderRadius: 3,
                borderColor: 'rgba(149, 165, 166, 0.3)',
              }}>
              <Text style={{marginBottom: 5}}>Description</Text>
              <View
                style={{
                  width: 50,
                  height: 1,
                  backgroundColor: 'rgba(44, 62, 80, 0.5)',
                  marginLeft: 7,
                  marginBottom: 10,
                }}
              />
              <NBText note>{route.params.product.description}</NBText>
            </View>
          </View>
          <View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>
            <Text style={{marginBottom: 5}}>Similar items</Text>
            <View
              style={{
                width: 50,
                height: 1,
                backgroundColor: 'rgba(44, 62, 80, 0.5)',
                marginLeft: 7,
                marginBottom: 10,
              }}
            />
            {/* {this.renderSimilairs()} */}
          </View>
        </Content>
      </Container>
    );
  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.openGallery(index)}>
        <Image
          source={{uri: item}}
          style={{width: Dimensions.get('window').width, height: 350}}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  };

  renderSize() {
    // let size = [];
    // this.state.product.sizes.map((s, i) => {
    //   size.push(<Item key={i} label={s} value={s} />);
    // });
    // return size;
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.product.similarItems;
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent
              key={stateItems[i + 1].id}
              product={stateItems[i + 1]}
              isRight
            />
          </Grid>,
        );
      } else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>,
        );
      }
    }
    return items;
  }

  openGallery = (pos) => {
    const {navigation} = this.props;
    // console.log(this.state.carouselImages);
    this.props.navigation.navigate('ImageGallery', {
      images: this.state.carouselImages,
      position: pos,
    });
  };

  addToCart() {
    const {navigation} = this.props;
    const url = this.props.route.params.product.url;
    // console.log(url);
    this.props.navigation.navigate('WebView', {
      url: url,
    });
    // var product = this.state.product;
    // product['color'] = this.state.selectedColor;
    // product['size'] = this.state.selectedSize;
    // product['quantity'] = this.state.quantity;
    // AsyncStorage.getItem('CART', (err, res) => {
    //   if (!res) AsyncStorage.setItem('CART', JSON.stringify([product]));
    //   else {
    //     var items = JSON.parse(res);
    //     items.push(product);
    //     AsyncStorage.setItem('CART', JSON.stringify(items));
    //   }
    //   Toast.show({
    //     text: 'Product added to your cart !',
    //     position: 'bottom',
    //     type: 'success',
    //     buttonText: 'Dismiss',
    //     duration: 3000,
    //   });
    // });
  }

  addToWishlist() {
    const product = this.props.route.params.product;

    // var product = this.state.product;
    var success = true;
    AsyncStorage.getItem('WISHLIST', (err, res) => {
      if (!res) AsyncStorage.setItem('WISHLIST', JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        if (this.search(items, product)) {
          success = false;
        } else {
          items.push(product);
          AsyncStorage.setItem('WISHLIST', JSON.stringify(items));
        }
      }
      if (success) {
        Toast.show({
          text: 'Product added to your wishlist !',
          position: 'bottom',
          type: 'success',
          buttonText: 'Dismiss',
          duration: 3000,
        });
      } else {
        Toast.show({
          text: 'This product already exist in your wishlist !',
          position: 'bottom',
          type: 'danger',
          buttonText: 'Dismiss',
          duration: 3000,
        });
      }
    });
  }

  search(array, object) {
    for (var i = 0; i < array.length; i++)
      if (JSON.stringify(array[i]) === JSON.stringify(object)) return true;
    return false;
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Product {...props} navigation={navigation} />;
}
