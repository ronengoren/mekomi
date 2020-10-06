import React, {Component} from 'react';
import {Container, View, Icon, Left, Button, Item, Input} from 'native-base';

// Our custom files and classes import
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import Colors from '../Colors';
import {useNavigation, StackActions} from '@react-navigation/native';

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
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
        <Navbar left={left} title="NEWSLETTER" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 50,
            paddingRight: 50,
          }}>
          <Item>
            <Icon active name="ios-mail-outline" />
            <Input
              placeholder="Your email address"
              onChangeText={(text) => this.setState({email: text})}
            />
          </Item>
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => this.subscribe()}
              style={{
                backgroundColor: Colors.navbarBackgroundColor,
                marginTop: 20,
              }}>
              <Text style={{color: '#fdfdfd'}}>Subscribe</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  subscribe() {
    alert('Subscribe address: ' + this.state.email);
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <Newsletter {...props} navigation={navigation} />;
}
