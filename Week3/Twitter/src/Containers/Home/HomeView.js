import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Modal} from 'react-native';
import {
  Icon,
} from 'native-base';
import Item from '../../Components/Item';
import { MENU_TYPE_HOME } from '../../Utils/Constants';
import UserProfilePopup from '../../Components/UserProfilePopup';
import ImageModal from '../../Components/ImageModal';

export default class HomeView extends Component {

  constructor(){
    super();

    this.state = {
      data: [],
      showImage: {
        isShow: false,
        url: ''
      }
    };
  }

  componentDidMount = () => {
    const { getHomeTimeLineFeed, getUserTimeLineFeed, token, screenProps : { type } } = this.props;
    if(type === MENU_TYPE_HOME){
     getHomeTimeLineFeed(token);
    }else {
      getUserTimeLineFeed(token);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { data} = nextProps;
    if(data && data.length > 0){
     this.setState({data})
    }
  };

  _keyExtractor = (item, index) => item.id;

  _like = (id, favorited) => {
    const { requestLikePost, token } = this.props;
    requestLikePost(id, favorited, token);
  };

  _reply = (id, name) => {
    const { navigation } = this.props;
    navigation.navigate('Reply', { id, screen_name: name});
  };

  _onPressImage = (url) => {
    this.setState({
      showImage: {
        isShow: true,
        url,
      }
    })
  };

  _onClose = () => {
    this.setState({
      showImage: {
        isShow: false,
        url: '',
      }
    })
  };

  _renderItem = ({item}) => {
    return <Item
            reply={this._reply}
            like={() => this._like(item.id_str, item.favorited)}
            onPressImage={this._onPressImage}
            {...item} />;
  };

  render() {
    const { userDialog, user, hideProfilePopup } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
           data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

        <UserProfilePopup
          onDismissed={hideProfilePopup}
          {... user}
          show={userDialog}
        />

        <ImageModal
          onClose={this._onClose}
          showImage={this.state.showImage}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
