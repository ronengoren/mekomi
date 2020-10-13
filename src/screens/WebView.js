import React, {Component, useRef} from 'react';
import {
  Container,
  View,
  Left,
  Right,
  Button,
  Icon,
  Item,
  Input,
  Spinner,
} from 'native-base';
import {StyleSheet, Linking, Share} from 'react-native';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import {
  CommonActions,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import {WebView as RnWebView} from 'react-native-webview';

class WebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }
  goBack = () => {
    this.refs[this.webView].goBack();
  };
  goForward = () => {
    this.refs[this.webView].goForward();
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share RedThread Bags!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const {navigation} = this.props;
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this.props.navigation.pop()} transparent>
          <Icon name="ios-arrow-back" style={{color: 'white'}} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex: 1}}>
        {/* <Button
          onPress={() => this.props.navigation.navigate('Search')}
          transparent>
          <Icon name="ios-star-outline" style={{color: 'white'}} />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('WishList')}
          transparent>
          <Icon name="ios-heart-outline" style={{color: 'white'}} />
        </Button> */}
      </Right>
    );
    return (
      <Container style={styles.container}>
        <Navbar left={left} right={right} />

        <RnWebView
          useWebKit
          ref={(node) => {
            this.webView = node;
          }}
          source={{uri: this.props.route.params.url}}
          renderLoading={() => <Spinner color="black" />}
          startInLoadingState
          //   onNavigationStateChange={this.handleNavStateChange}
        />

        <View style={styles.footer}>
          <Button onPress={() => this.webView.goBack()} transparent>
            <Icon
              name="arrow-back-circle"
              fontSize={50}
              style={styles.iconButton}
            />
          </Button>
          <Button onPress={() => this.webView.goForward()} transparent>
            <Icon
              name="arrow-forward-circle"
              fontSize={50}
              style={styles.iconButton}
            />
          </Button>
          <Button onPress={this.onShare} transparent>
            <Icon name="share-social" fontSize={50} style={styles.iconButton} />
          </Button>
          <Button
            onPress={() => Linking.openURL('https://www.guymizrachy.com/shop')}
            transparent>
            <Icon name="globe" fontSize={50} style={styles.iconButton} />
          </Button>
        </View>
      </Container>
    );
  }

  login() {
    /*
      Remove this code and replace it with your service
      Username: this.state.username
      Password: this.state.password
    */
    this.setState({
      hasError: true,
      errorText: 'Invalid username or password !',
    });
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <WebView {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerOuter: {
    backgroundColor: 'grey',
  },
  headerInner: {
    paddingTop: 8,
    paddingBottom: 6,
    paddingLeft: 50,
    paddingRight: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: 'grey',
  },
  titleText: {
    marginBottom: 2,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 35,
    paddingVertical: 5,
    backgroundColor: 'black',
  },
  progressBar: {
    height: 2,
  },
  iconButton: {
    color: 'white',
  },
});
