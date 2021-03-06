import React, {Component} from 'react';
import {Image, Dimensions, TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Our custom files and classes import
import Text from './Text';

class RedThreadBlock extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('WebView', {
              url: 'https://www.guymizrachy.com/shop',
            });
          }}
          activeOpacity={0.9}>
          <View>
            <Image style={styles.image} source={{uri: this.props.image}} />
            <View style={styles.overlay} />
            <View style={styles.border} />
            <View style={styles.text}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onPress() {
    const {navigation} = this.props;
    this.props.navigation.navigate('Category', {
      id: this.props.id,
      title: this.props.title,
    });
  }
}

const styles = {
  text: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '200',
  },
  subtitle: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 16,
    fontWeight: '100',
    fontStyle: 'italic',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 42, 54, 0.4)',
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)',
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
};

export default function (props) {
  const navigation = useNavigation();

  return <RedThreadBlock {...props} navigation={navigation} />;
}
