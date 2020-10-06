import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
  Icon,
  Left,
  Button,
  Item,
  Input,
} from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet, SafeAreaView, PermissionsAndroid} from 'react-native';

// Our custom files and classes import
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import Colors from '../Colors';
import {useNavigation, StackActions} from '@react-navigation/native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
class Map extends Component {
  map = null;

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 48.85837009999999,
        longitude: 2.2944813000000295,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        title: 'STORE PARIS',
        address: '21 bis rue de la trippe, paris',
        coord: {
          latitude: 48.85837009999999,
          longitude: 2.2944813000000295,
        },
      },
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
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          region={this.state.region}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <MapView.Marker
            title={this.state.marker.title}
            description={this.state.marker.address}
            coordinate={this.state.marker.coord}
          />
        </MapView>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestCameraPermission} />
        <Navbar left={left} title="FIND US" />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <Map {...props} navigation={navigation} />;
}
