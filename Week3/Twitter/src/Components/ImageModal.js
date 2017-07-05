import React, {Component} from 'react';
import {Image, View, Modal, Dimensions} from 'react-native';
import {
  Container, Content, Card, CardItem, Thumbnail,
  Text, Button, Icon, Left, Body, H2
} from 'native-base';
import { Constants } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const ImageModal = (props) => {

  const { showImage : { isShow, url }, onClose } = props;

  return (
    <Modal
      animationType={"none"}
      transparent={false}
      visible={isShow}
      onRequestClose={() => {
        //alert("Modal has been closed.")
      }}
    >
      <Container style={styles.container}>
        <Button transparent onPress={onClose}>
          <MaterialIcons size={24} name='close' color="#FFF"/>
        </Button>
        <Content contentContainerStyle={styles.content}>
          <View style={{ width: width - 16, height: 360, backgroundColor: '#FFFF00',}}>
            <Image
              style={{flex: 1}}
              source={{url: url}}/>
          </View>
        </Content>
      </Container>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'grey',
    paddingTop: Constants.statusBarHeight
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default ImageModal;
