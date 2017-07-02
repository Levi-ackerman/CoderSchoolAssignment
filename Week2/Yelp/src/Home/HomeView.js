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

export default class Home extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loadMore: false,
    };
  }

  componentDidMount = () => {
     const {loadYelpData} = this.props;
     loadYelpData();
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.meta !== this.props.meta){
      const {fetching, loadYelpData} = this.props;
      if(!fetching){
        loadYelpData(false);
      }
    }

    const {data } = nextProps;
    this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
  };

  onRefresh = () => {
    const { fetching, offset, loadYelpData } = this.props;
    if(!fetching && offset >= 0){
      loadYelpData(false, true);
    }
  };

  onEndReached = () => {
    const { fetching, offset, loadYelpData } = this.props;
    if(!fetching && offset >= 0){
      console.log('[HomeView.js] onEndReached', this.props);
      loadYelpData(true);
    }
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
    const { fetching } = this.props;

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
            refreshing={fetching}
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