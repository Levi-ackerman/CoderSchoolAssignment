import React, {Component} from 'react';
import { Image, StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Title,
  Body,
  Right,
  Text,
  Thumbnail,
  CardItem,
  Textarea,
  Toast,
} from 'native-base';
import { REPLY_TWEET_STATUS } from '../../Redux/UIReducer';
import { MaterialIcons } from '@expo/vector-icons';

export default class ReplyView extends Component {

  constructor(){
    super();

    this.state = {
      limit: 140,
      status: '',
    };
  };

  componentWillReceiveProps = (nextProps) => {
    const { replyStatus, navigation } = nextProps;
    if(replyStatus !== this.props.replyStatus){
      if(replyStatus === 1){
        Toast.show({
          text: 'Reply Success',
          position: 'bottom',
          duration: 1300,
        })
      }else if(replyStatus === -1){
        Toast.show({
          text: 'Reply error and I dont know why !',
          position: 'bottom',
          duration: 1300,
        })
      }
      setTimeout(() => {
        navigation.dispatch({
          type: REPLY_TWEET_STATUS,
          payload: 0,//success
        });
        navigation.goBack();
      }, 300);
    }
  };

  _close = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  _reply = () => {
    const { token, navigation, requestReply } = this.props;
    const params = navigation.state.params;
    requestReply(token, {target : params.id, status: `@${params.screen_name} ${this.state.status}`});
  };

  _onChangeText = (status) => {
    let limit = 140 - status.trim().length;
    this.setState({ status, limit });
  };
  render() {
    const { user : { name, screen_name, profileImageUrl }, navigation : { state} } = this.props;

    const params = state.params;

    return (
      <Container
        style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this._close}>
              <MaterialIcons size={24} name='close' color="#138BF2" />
            </Button>
          </Left>
          <Body/>
          <Right>
            <Body style={{ flexDirection: 'row'}}>
              <Text style={{marginRight: 4}}>{this.state.limit}</Text>
              <Button disabled={this.state.status.length === 0} onPress={this._reply} small rounded>
                <Text>Reply</Text>
              </Button>
            </Body>
          </Right>
        </Header>

        <Content>
          <CardItem padder style={{height: 72, flexDirection: 'row',}}>
            <Left style={{flexDirection: 'row'}}>
              <Thumbnail source={{uri: profileImageUrl}} />
              <Body>
              <Text>{name}</Text>
              <Text note>{`@${screen_name}`}</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem style={{flexDirection: 'row'}}>
            <Text>Reply to</Text>
            <Text style={{color: '#138BF2'}}>{` @${params.screen_name}`}</Text>
          </CardItem>

          <CardItem style={{}}>
            <Textarea
              value={this.state.status}
              style={{ flex: 1, paddingLeft: 0,}}
              autoFocus
              placeholder="Tweet your reply"
              onChangeText={this._onChangeText}
            />
          </CardItem>

        </Content>




      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};
