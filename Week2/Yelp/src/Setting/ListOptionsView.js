import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

//component
import OptionItem from '../Components/OptionItem';
import RoundButton from '../Components/RoundButton';
import SettingItem from '../Components/SettingItem';
//lib and constants
import {AppColors} from '../Styles/index';
import {LIST_DISTANCE} from '../Lib/Constant';

export default class ListOptionsView extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.listItem = [];
    this.selectedItems = [];
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  renderItem = (item) => {
    return (
      <OptionItem key={item.name} onValueChange={this.onValueChange} item={item}/>
    );
  };

  onValueChange = (value, option) => {
    const {title} = this.props.navigation.state.params;
    if (title === 'Distance') {
      let numOfSelected = 0;
      for(let item in this.listItem){
        if(item.value === option.value){
          item.selected = value;
        }
        if(item.selected){
          numOfSelected++;
        }
      }

      if(numOfSelected == 0){
        this.listItem[0].selected = true;
      }

    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.listItem)
    })

  };

  componentWillMount = () => {
    console.log('[ListOptionsView.js] componentWillMount', this.props);
    const {data, title, selected} = this.props.navigation.state.params;
    if (title === 'Distance') {
      this.listItem = LIST_DISTANCE;
      this.selectedItems = selected;

      for (let item in this.listItem) {
        for (let _item in this.selectedItems) {
          if (item.value === _item.value) {
            item.selected = true;
          }
        }
      }
    }


    this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
  };

  render() {
    console.log('[ListOptionsView.js] render', this.state);
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        onEndReached={() => {
        }}
        onEndReachedThreshold={200}
        renderFooter={() => {
        }}
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