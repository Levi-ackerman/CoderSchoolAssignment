import React, {Component} from 'react';
import {
  ListView,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';

import MovieItem from './MovieItem';

export default class AppLaunch extends Component {

  static propTypes = {
    data: React.PropTypes.array,
    itemClick: React.PropTypes.func,
  };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loadMore: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
      });
    }
  }

  renderItem = (item) => {
    return (
      <MovieItem key={item.id} {...item} />
    );
  };

  renderFooter = () => {
    return null;
  };

  render = () => {
    const {refreshing, onRefresh, onEndReached} = this.props;
    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={200}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF00FF"
          />
        }
      />
    );
  };
}

