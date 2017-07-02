import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { loadYelpData, searchTerm, updateMeta } from '../Home/Action';
import { AppColors} from '../Styles/index';
import {delay} from '../Lib/Utils';
import { searchIndicator } from '../Home/UIReducer';

const SearchBar = (props) => {
  console.log('[SearchBar.js] SearchBar', props);
  const { navigation : { navigate }, searchTerm, token, loading } = props;

  const onChangeText = (term) => {
    if(term === null || term === undefined){
      term = '';
    }

    if(!loading){
      props.navigation.dispatch(searchIndicator(true));
    }

    if(loading && term === ''){
      props.navigation.dispatch(searchIndicator(false));
    }

    delay(() => {
      props.navigation.dispatch(updateMeta({term}));
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Button color={'#FFF'} style={styles.filter}
              title={'Filter'}
              onPress={() => navigate('Setting')}/>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize={'none'}
          returnKeyType={'search'}
          onChangeText={onChangeText}
          autoCorrect={false}
          style={styles.input}/>
      </View>

      {
        loading ? (
          <ActivityIndicator
            style={{width: 40 }}
            animating={true}
            color={'#FFF'}
          />
        ): null
      }

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: (Platform.OS !== 'ios' ? 54 : 64),
    backgroundColor: AppColors.colorPrimary,
    paddingTop: 28,
    paddingHorizontal: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  filter: {
    color: '#FFF',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});

// What data from the store shall we send to the component?
const mapStateToProps = (state) => {
  return {
    meta: state.meta,
    token : state.global.yelpToken.access_token,
    loading: state.ui.searchIndicator,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = {
  searchTerm,
  loadYelpData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
