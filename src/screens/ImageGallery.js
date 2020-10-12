import React, {Component} from 'react';
import {View, Icon} from 'native-base';
import Gallery from 'react-native-image-gallery';
import {LogBox} from 'react-native';

// Our custom files and classes import
import Text from '../components/Text';
import {useNavigation, StackActions} from '@react-navigation/native';
class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }
  UNSAFE_componentWillMount() {
    const {navigation} = this.props;

    let imgs = [];
    this.props.route.params.images.map((img) => {
      imgs.push({source: {uri: img}});
    });
    this.setState({images: imgs});
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Gallery
          initialPage={this.props.position ? this.props.position : 0}
          style={{flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}
          images={this.state.images}
        />
        <Icon
          name="ios-close"
          style={styles.icon}
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}

const styles = {
  icon: {
    color: 'white',
    fontSize: 46,
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
  },
};
export default function (props) {
  const navigation = useNavigation();

  return <ImageGallery {...props} navigation={navigation} />;
}
