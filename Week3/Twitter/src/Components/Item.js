import React, {Component} from 'react';
import {Image, TouchableOpacity, View } from 'react-native';
import {
  Container, Content, Card, CardItem, Thumbnail,
  Text, Button, Icon, Left, Body, H2
}
from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { createAt } from '../Utils/DatetimeUtils';

const Item = (props) => {
  const {id, text, user, entities: { media }, created_at,
    favorited, retweeted, retweet_count, favorite_count,
    like, reply, onPressImage} = props;

  const _reply = (id, name) => reply(id, name);

  return (
    <View>
      <Content style={{flex: 1}}>
        <Card style={styles.card}>
          <View  style={{padding : 8}}>
            <Thumbnail
              source={{uri: user.profile_image_url}}/>
          </View>

          <Content>
            <CardItem style={{paddingLeft: 0, paddingRight: 8}}>
              <Left>
                <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{user.name}</Text>
                  <Text note>{` @${user.screen_name}`}</Text>
                  <Text note>{createAt(created_at)}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem style={{paddingLeft: 0, paddingRight: 8}}>
              <Body>
              <Text>{text}</Text>
              {
                media ? (
                  media.map((item) => {
                    if (item.type === 'photo') {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.5}
                          onPress={() => onPressImage(item.media_url)}>
                          <Image source={{uri: item.media_url}}
                                 style={{flex: 1, width: 300, height: 250}}/>
                        </TouchableOpacity>
                      )
                    }
                  })
                ) : null
              }
              </Body>
            </CardItem>

            <CardItem style={{justifyContent: 'space-between',}}>
              <Button transparent onPress={() => _reply(id, user.screen_name)} textStyle={{color: '#87838B'}}>
                <Entypo name="reply" size={24} color="#138BF2" />
              </Button>
              <Button transparent>
                {
                  retweeted ?
                    (<Entypo name="retweet" size={24} color="red" />)
                    :
                    (<Entypo name="retweet" size={24} color="#138BF2" />)
                }
                <Text style={{ color: '#138BF2'}}>{favorite_count}</Text>
              </Button>

              <Button transparent onPress={like}>

                {
                  favorited ?
                    (<Entypo name="heart" size={24} color="red" />)
                    :
                    (<Entypo name="heart-outlined" size={24} color="#138BF2" />)
                }
                <Text style={{ color: '#138BF2'}}>{favorite_count}</Text>
              </Button>
              <Button transparent>
                <Entypo name="mail" size={24} color="#138BF2" />
              </Button>
            </CardItem>
          </Content>
        </Card>
      </Content>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  card: {
    flexDirection: 'row',
  },
};

export default Item;
