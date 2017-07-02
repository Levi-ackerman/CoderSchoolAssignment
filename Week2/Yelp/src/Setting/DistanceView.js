import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
} from 'react-native';

//component
import OptionItem from '../Components/OptionItem';
//lib and constants
import {AppColors} from '../Styles/index';
import {LIST_DISTANCE} from '../Lib/Constant';
import {UPDATE_DISTANCE} from './ActionType';

export default class DistanceView extends Component {


  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1 !== r2;
    }});
    this.listItem = LIST_DISTANCE;
    this.selectedItems = [];
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
  }


  componentDidMount = () => {
    const { navigation : { state } } = this.props;
    this.listItem.map((item) => {
      item.selected = (item.value === state.params.selected.value);
      return item;
    });
    const newArray = this.listItem.slice();
    this.setState({dataSource: this.ds.cloneWithRows(newArray)});
  };

  renderItem = (item) => {
    return (
      <OptionItem key={item} onValueChange={this.onValueChange} item={item}/>
    );
  };

  onValueChange = (value, option) => {
    let selected;
    if(!value){
      selected = { name: '1 km', value: 1000,};
    }else {
      selected = option;
    }
    this.listItem.map(item => {
      item.selected = (item.value === selected.value);
      return item;
    });
    let arr = this.listItem.slice();

    this.setState({dataSource: this.ds.cloneWithRows(arr)});
    this.props.navigation.dispatch({
      type: UPDATE_DISTANCE,
      payload: selected,
    })
  };

  render() {
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 40,
  },
  buttonLogin: {
    width: null,
    height: 40,
    marginTop: 64,
    backgroundColor: AppColors.colorSecondaryText,
  },
  buttonTextLogin: {
    color: '#FFF',
    fontSize: 20,
  },
  facebookLogin: {
    width: null,
    height: 40,
    borderWidth: 1.5,
    borderColor: AppColors.colorPrimary,
    marginTop: 32,
  },
  textFacebookLogin: {
    color: AppColors.colorPrimary,
    fontSize: 20,
  },
});