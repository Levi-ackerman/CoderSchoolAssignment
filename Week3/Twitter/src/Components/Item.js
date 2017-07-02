import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Container, Content, Card, CardItem, Thumbnail,
  Text, Button, Icon, Left, Body
}
  from 'native-base';

const Item = (props) => {

//  const { like } = props;

  const {text, user, entities: {media}, created_at, favorited, favorite_count, like} = props;

  /* return (
   <View>
   <Content>
   <Card style={{flex: 0}}>
   <CardItem>
   <Left>
   <Thumbnail source={{uri: 'Image URL'}} />
   <Body>
   <Text>NativeBase</Text>
   <Text note>April 15, 2016</Text>
   </Body>
   </Left>
   </CardItem>
   <CardItem>
   <Body>
   <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
   <Text>
   //Your text here
   </Text>
   </Body>
   </CardItem>

   <CardItem style={{justifyContent: 'space-between',}}>
   <Button transparent textStyle={{color: '#87838B'}}>
   <Icon name="undo"/>
   </Button>
   <Button transparent onPress={like} textStyle={{color: '#87838B'}}>
   <Icon name="heart"/>
   </Button>
   <Button transparent textStyle={{color: '#87838B'}}>
   <Icon name="repeat" style={{color: 'red'}} />
   </Button>
   <Button transparent textStyle={{color: '#87838B'}}>
   <Icon name="more"/>
   </Button>
   </CardItem>

   </Card>
   </Content>
   </View>
   );*/

  return (
    <View>
      <Content style={{flex: 1}}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: user.profile_image_url}}/>
              <Body>
              <Text>{user.name}</Text>
              <Text note>{created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
            <Text>{text}</Text>
            {
              media ? (
                media.map((item) => {
                  if (item.type === 'photo') {
                    return (
                      <Image key={item.id} source={{uri: item.media_url}}
                             style={{flex: 1, width: 300, height: 250}}/>
                    )
                  }
                })
              ) : null
            }
            </Body>
          </CardItem>

          <CardItem style={{justifyContent: 'space-between',}}>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="undo"/>
            </Button>
            <Button transparent onPress={like} textStyle={{color: '#87838B'}}>
              {
                favorited ?
                  (
                    <Icon name="happy" style={{ color: 'red'}}/>
                )
                  :
                  (
                    <Icon name="heart" />
                  )
              }
              <Text>{favorite_count}</Text>
            </Button>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="repeat" style={{color: 'red'}}/>
            </Button>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="more"/>
            </Button>
          </CardItem>

        </Card>
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default Item;
