import React, {Component} from 'react';
import {View, Icon} from 'native-base';
import Gallery from 'react-native-image-gallery';

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

  UNSAFE_componentWillMount() {
    let imgs = [];
    this.props.images.map((img) => {
      imgs.push({source: {uri: img}});
    });
    this.setState({images: imgs});
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Gallery
          initialPage={this.props.position ? this.props.position : 0}
          style={{flex: 1, backgroundColor: 'black'}}
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
