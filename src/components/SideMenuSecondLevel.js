import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Button, ListItem, List, Body, Right, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../routes/appRouter';

// Our custom files and classes import
import Text from './Text';

class SideMenuSecondLevel extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Icon
            name="ios-arrow-back"
            style={{fontSize: 20, marginTop: 4}}
            onPress={() => this.props.back()}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              {this.props.title}
            </Text>
          </View>
        </View>
        <View style={{paddingRight: 15}}>
          <List>{this.renderMenuItems()}</List>
        </View>
      </View>
    );
  }

  renderMenuItems() {
    let items = [];
    this.props.menu.map((item, i) => {
      items.push(
        <ListItem
          last={this.props.menu.length === i + 1}
          icon
          key={item.id}
          button={true}
          onPress={() => this.itemClicked(item)}>
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>,
      );
    });
    return items;
  }

  itemClicked(item) {
    RootNavigation.navigate('Category', {id: item.id, title: item.title});
  }
}

const styles = {
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
};

export default SideMenuSecondLevel;
