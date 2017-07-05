import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Thumbnail,
  H3,
  Text,
  Content,
} from 'native-base';
import PopupDialog, { ScaleAnimation }
from 'react-native-popup-dialog';

const scaleAnimation = new ScaleAnimation();

const UserProfilePopup = (props) => {

  const { show, name, screen_name, profileImageUrl, friends, followers, statuses, onDismissed } = props;

  return (
    <PopupDialog
      show={show}
      dialogAnimation={scaleAnimation}
      onDismissed={onDismissed}
    >
      <Container>
        <Content padder contentContainerStyle={{justifyContent:'center', alignItems: 'center'}}>
          <Image
            style={{ width : 120, height: 120, borderRadius: 60}}
            source={{uri: profileImageUrl}} />
          <H3 style={{ marginTop: 16}}>{name}</H3>
          <Text note>{`@${screen_name}`}</Text>

          <Text style={{marginTop: 16}}>Friends       #<Text style={{fontWeight: '800'}}>{friends}</Text></Text>
          <Text style={{marginTop: 4}}>Followers      #<Text style={{fontWeight: '800'}}>{followers}</Text></Text>
          <Text style={{marginTop: 4}}>Statuses       #<Text style={{fontWeight: '800'}}>{statuses}</Text></Text>

        </Content>
      </Container>
    </PopupDialog>

  );
};

export default UserProfilePopup;
