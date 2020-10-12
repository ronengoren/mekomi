import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {
  Container,
  View,
  Left,
  Right,
  Button,
  Icon,
  Item,
  Input,
} from 'native-base';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import {StackActions, useNavigation} from '@react-navigation/native';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      username: '',
      password: '',
      rePassword: '',
      hasError: false,
      errorText: '',
    };
  }

  render() {
    const {navigation} = this.props;
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this.props.navigation.pop()} transparent>
          <Icon name="ios-arrow-back" />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex: 1}}>
        <Button
          onPress={() => this.props.navigation.navigate('Search')}
          transparent>
          <Icon name="ios-star-outline" />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('WishList')}
          transparent>
          <Icon name="ios-heart-outline" />
        </Button>
      </Right>
    );
    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="SIGN UP" />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 50,
              paddingRight: 50,
            }}>
            <View style={{marginBottom: 35, width: '100%'}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  width: '100%',
                  color: Colors.navbarBackgroundColor,
                }}>
                Create your account,{' '}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'left',
                  width: '100%',
                  color: '#687373',
                }}>
                Signup to continue{' '}
              </Text>
            </View>
            <Item>
              <Icon active name="ios-mail" style={{color: '#687373'}} />
              <Input
                placeholder="Email"
                onChangeText={(text) => this.setState({email: text})}
                keyboardType="email-address"
                placeholderTextColor="#687373"
              />
            </Item>
            <Item>
              <Icon active name="ios-man" style={{color: '#687373'}} />
              <Input
                placeholder="Name"
                onChangeText={(text) => this.setState({name: text})}
                placeholderTextColor="#687373"
              />
            </Item>
            <Item>
              <Icon active name="ios-person" style={{color: '#687373'}} />
              <Input
                placeholder="Username"
                onChangeText={(text) => this.setState({username: text})}
                placeholderTextColor="#687373"
              />
            </Item>
            <Item>
              <Icon
                active
                name="lock-open-outline"
                style={{color: '#687373'}}
              />
              <Input
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                placeholderTextColor="#687373"
              />
            </Item>
            <Item>
              <Icon
                active
                name="lock-open-outline"
                style={{color: '#687373'}}
              />
              <Input
                placeholder="Repeat your password"
                onChangeText={(text) => this.setState({rePassword: text})}
                secureTextEntry={true}
                placeholderTextColor="#687373"
              />
            </Item>
            {this.state.hasError ? (
              <Text
                style={{color: '#c0392b', textAlign: 'center', marginTop: 10}}>
                {this.state.errorText}
              </Text>
            ) : null}
            <View style={{alignItems: 'center'}}>
              <Button
                onPress={() => this.signup()}
                style={{
                  backgroundColor: Colors.navbarBackgroundColor,
                  marginTop: 20,
                }}>
                <Text style={{color: '#fdfdfd'}}>Signup</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }

  signup() {
    const {navigation} = this.props;

    if (
      this.state.email === '' ||
      this.state.name === '' ||
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.rePassword === ''
    ) {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if (!this.verifyEmail(this.state.email)) {
      this.setState({
        hasError: true,
        errorText: 'Please enter a valid email address !',
      });
      return;
    }
    if (this.state.username.length < 3) {
      this.setState({
        hasError: true,
        errorText: 'Passwords must contains at least 3 characters !',
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        hasError: true,
        errorText: 'Passwords must contains at least 6 characters !',
      });
      return;
    }
    if (this.state.password !== this.state.rePassword) {
      this.setState({hasError: true, errorText: 'Passwords does not match !'});
      return;
    }
    this.setState({hasError: false});
    this.props.navigation.navigate('Home');
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <Signup {...props} navigation={navigation} />;
}
