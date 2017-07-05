import {connect} from 'react-redux';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Content,
  Thumbnail,
  H3,
  Text,
  Button,
} from 'native-base';
import MenuItem from './MenuItem';
import {logout} from '../Containers/Login/Action';
import {SHOW_USER_DIALOG} from '../Redux/UIReducer';

const Drawer = (props) => {
  const {user, navigation: {navigate, state: {index, routes}}, logout} = props;
  const getIcon = (index) => {
    switch (index) {
      case 0:
        return 'home';
      case 1:
        return 'timeline';
      case 2:
        return 'television';
      case 3:
        return 'users';
      default:
        return 'cc-discover';
    }
  };

  const openProfile = () => {
    navigate('DrawerClose');
    setTimeout(() => props.openProfile(), 400);
  };

  return (
    <Container style={{backgroundColor: '#262C36'}}>
      <Content>
        <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={openProfile}
            activeOpacity={0.5}
          >
            <Thumbnail
              large source={{uri: user.profileImageUrl}}/>
          </TouchableOpacity>
          <H3 style={{color: '#fff', marginTop: 16}}>{user.name}</H3>
          <Text style={{color: '#fff'}} note>{`@${user.screen_name}`}</Text>
        </View>
        <View style={styles.menuContent}>
          {
            routes.map((item, i) => {

              return (<MenuItem key={item.routeName} icon={getIcon(i)} {...item} navigate={navigate}
                                selected={index === i}/>);
            })
          }
        </View>
      </Content>

      <Button
        transparent
        onPress={() => {
          AsyncStorage.clear();
          logout();
          navigate('Login');
        }}>
        <Text style={{ color: '#FFF'}}> Logout </Text>
      </Button>

    </Container>
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

const mapDispatchToProps = dispatch => {
  return {
    openProfile: () => dispatch({
      type: SHOW_USER_DIALOG,
      payload: true,
    }),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
