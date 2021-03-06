import React, {Component} from 'react';
import {Header, Body, Title, Left, Right, Icon} from 'native-base';

// Our custom files and classes import
import Colors from '../Colors';

class Navbar extends Component {
  render() {
    return (
      <Header
        style={{backgroundColor: Colors.navbarBackgroundColor}}
        backgroundColor={Colors.navbarBackgroundColor}
        androidStatusBarColor={Colors.statusBarColor}
        noShadow={false}>
        {this.props.left ? this.props.left : <Left style={{flex: 1}} />}
        <Body style={styles.body}>
          <Title adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
            {this.props.title}
          </Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
      </Header>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'System',
    fontWeight: '200',
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',

    color: 'white',
  },
};

export default Navbar;
