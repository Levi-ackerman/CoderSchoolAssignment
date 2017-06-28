/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl
} from 'react-native';
//component
import Item from '../Components/Item';

import {AppColors} from '../Styles/index';
import {delay} from '../Lib/Utils';

export default class Home extends Component {

  // static navigationOptions = {
  //   header: (navigation) => <Search navigation={navigation} />,
  // };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loadMore: false,
      //updated: false,
    };
  }

  componentDidMount = () => {
    console.log('[HomeView.js] componentDidMount', this.props);
    const {token, meta, paginations: {currentPage, pages}, loadYelpData} = this.props;
    // loadYelpData(token, {page: currentPage, loadMore: false});
    loadYelpData(token, currentPage, meta);
  };

  componentWillReceiveProps = (nextProps) => {
    this.updated = false;
    console.log('[HomeView.js] componentWillReceiveProps', nextProps);
    const {data, paginations: {currentPage, pages}} = nextProps;
    if (pages[currentPage] && !pages[currentPage].fetching) {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.updated = true;
  };

  onRefresh = () => {
    const {token, meta, loadYelpData} = this.props;
    this.props.navigation.dispatch(this.props.resetBusiness);
    loadYelpData(token, 1, meta);
  };

  onEndReached = () => {
    console.log('[HomeView.js] onEndReached', this.updated);
    const {token, data, meta, paginations: {currentPage}, loadYelpData} = this.props;
    if (data.length >= currentPage * 20) {
      loadYelpData(token, currentPage + 1, meta);
    }
  };

  handleSearch = (term) => {
    //console.log('[HomeView.js] componentWillReceiveProps terrmmm', this.props);

    const {token, searchTerm, loadYelpData, navigation} = this.props;
    navigation.dispatch(searchTerm(term));
  };


  getQueryParams = (loadMore) => {
    const {currentPage, options: {categories, location, openNow, term}}
      = this.props.businesses;

    return {
      offset: (loadMore ? currentPage + 1 : currentPage),
      term,
      location,
      categories: categories.join(','),
      open_now: openNow,
    };
  };

  renderItem = (item) => {
    return (
      <Item key={item.id} {...item} />
    );
  };

  renderFooter = () => {
    return null;
  };

  render() {
    console.log('[HomeView.js] render xxx', this.props);
    const {currentPage, pages} = this.props.paginations;
    const refreshing = !!pages[currentPage] && pages[currentPage].fetching;
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={200}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            tintColor={AppColors.colorPrimary}
          />
        }
      />
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