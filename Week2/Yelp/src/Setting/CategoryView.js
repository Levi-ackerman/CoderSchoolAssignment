import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  SectionList,
  Text,
  View,
} from 'react-native';

//component
import OptionItem from '../Components/OptionItem';
//lib and constants
import {AppColors} from '../Styles/index';
import Categories from '../Data/categories.json';

export default class CategoryView extends Component {


  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      selected : ['airsoft', 'amateursportsteams' ]
    };
  }

  componentWillMount = () => {
    let headers = [];
    let data = [];

    Categories.map(item => {
      if(item.parents.length === 0){
        headers.push(item);
      }else {
        data.push(item);
      }
    });

    headers.map(header => {
      let _data = data.filter((item) => item.parents[0] === header.alias);
      return header.data = _data;
    });

    this.state.sections = headers;
  };

  componentDidMount = () => {

  };

  renderItem = ({item}) => {
    return (
      <OptionItem key={item.title} selectedValues={this.state.selected} onValueChange={this.onValueChange} item={item}/>
    );
  };

  renderSectionHeader = ({section}) => {
    return (
      <View style={{backgroundColor: AppColors.colorPrimary}}>
        <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>{section.title}</Text>
      </View>
    );
  };

  onValueChange = (value, option) => {
    //alert(JSON.stringify(value) + ' \n' + JSON.stringify(option));
    let newArray = this.state.selected.slice();
    if(value){
      newArray.push(option.alias);
    }else {
      let index = newArray.indexOf(option.alias);
      if(index >= 0){
         newArray.splice(index, 1);
      }
    }

    this.setState({selected: newArray});
  };

  render() {
    return (
      <SectionList
        style={styles.container}
        enableEmptySections
        renderItem={this.renderItem}
        sections={this.state.sections}
        keyExtractor={(item, index) => item.title}
        renderSectionHeader={this.renderSectionHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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