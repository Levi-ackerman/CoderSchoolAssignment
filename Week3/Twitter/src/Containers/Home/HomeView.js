import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  Icon,
} from 'native-base';
import Item from '../../Components/Item';

export default class HomeView extends Component {

  constructor(){
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    const { getHomeTimeLineFeed, token } = this.props;
    getHomeTimeLineFeed(token);
  };

  componentWillReceiveProps = (nextProps) => {
    const { navigation, data} = nextProps;
    if(data && data.length > 0){
     this.setState({data})
    }
  };

  _keyExtractor = (item, index) => item.id;

  _like = (id, favorited) => {
    const { requestLikePost, token } = this.props;
    requestLikePost(id, favorited, token);
  };

  _renderItem = ({item}) => {
    return <Item like={() => this._like(item.id_str, item.favorited)} {...item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          //data={[{id: 'a'}, {id: 'b'}]}
           data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
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
