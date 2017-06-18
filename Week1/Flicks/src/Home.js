import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import MovieItem from './uis/MovieItem';

import {loadNowPlayingMovies} from './Api';

export default class Home extends Component {

  constructor() {
    super();

    this.movies = [];
    this.currentPage = 1;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([this.movies]),
      loading: false,
      loadMore: false,
    };
  }


  componentDidMount = () => {
    this.loadMovies(true, false);
  };

  onRefresh = () => {
    this.currentPage = 1;
    this.loadMovies(true, false)
  };

  onEndReached = () => {
    if (this.movies.length > 0 && !this.state.loading) {
      this.currentPage++;
      this.loadMovies(false, true);
    }
  };

  renderItem = (item) => {
    return (
      <MovieItem onClick={this.itemClick} key={item.id} {...item} />
    );
  };

  itemClick = (item) => {
    this.props.navigation.navigate('Detail', item);
  };

  renderFooter = () => {
    if(this.state.loadMore){
      return (
        <View style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#ff00ff'} size={'large'} animating={true}/>
        </View>
      );
    }
    return null;
  };

  loadMovies = (refresh, loadMore) => {
    this.showLoading(true, loadMore);
    loadNowPlayingMovies(this.currentPage)
      .then((response) => {
        this.movies = refresh ? response.results : this.movies.concat(response.results);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.movies),
        });
        this.showLoading(false, loadMore);
      })
      .catch((error) => {
        this.showLoading(false, loadMore);
        console.log('[Load now playing movies error] ', error);
      })
  };

  showLoading = (value, loadMore) => {
    if (loadMore) {
      this.setState({loadMore: value});
    } else {
      this.setState({loading: value});
    }
  };

  render() {
    console.log('[Home.js] render', this.props);
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
          renderFooter={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefresh}
              tintColor="#FF00FF"
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
