import { connect } from 'react-redux';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';
import MenuItem from './MenuItem';

const Drawer = (props) => {
 const {user, navigation: { navigate, state : {index , routes}}} = props;

  const getIcon = (index) => {
    switch (index){
      case 0: return 'cc-discover';
      case 1: return 'film';
      case 2: return 'television';
      case 3: return 'users';
      default: return 'cc-discover';
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.menuHeader}>
        <Image style={styles.imageBackground}
               source={{uri: user.profileBannerUrl}}>
          <Image style={styles.avatar}
                 source={{uri: user.profileImageUrl}}/>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.email}>{`${user.name}@gmail.com`}</Text>
        </Image>
      </View>

      <View style={styles.menuContent}>
        {
          routes.map((item, i) => {

            return (<MenuItem key={item.routeName} icon={getIcon(i)} {...item} navigate={navigate} selected={index === i} />);
          })
        }
      </View>

      <Button buttonStyle={{margin: 16}} title={'Logout'} onPress={() => {
        AsyncStorage.clear();
        navigate('Login');
      }}/>

    </View>
  )
};

const styles = StyleSheet.create({
  menuHeader: {
    height: 200,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 16,
    backgroundColor: 'transparent',
    color: '#FFF',
  },
  email: {
    fontSize: 16,
    marginTop: 4,
    backgroundColor: 'transparent',
    color: '#FFF',
  },
  menuContent: {
    flex: 1,
    marginTop: 16,
  }
});

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Drawer);
