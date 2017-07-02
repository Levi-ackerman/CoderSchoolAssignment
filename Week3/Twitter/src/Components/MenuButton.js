import React from 'react';
import { Button, Text, Icon } from 'native-base';

const MenuButton = ({navigation}) => {
  return (
    <Button iconLeft transparent onPress={() => navigation.navigate('DrawerOpen')}>
      <Icon ios='ios-menu' android="md-menu"
            style={{fontSize: 24, color: 'white'}}/>
    </Button>
  );
};

MenuButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default MenuButton;