import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovieItem = (props) => {
  const {title, vote_average, poster_path, release_date, overview } = props;
  const { onClick } = props;

  const Wrapper = Platform.select({
    ios: () => require('TouchableHighlight'),
    android: () => require('TouchableNativeFeedback'),
  })();

  return (
    <Wrapper
      underlayColor="blue"
      style={styles.container}
      onPress={() => onClick(props)} >

      <View style={styles.card}>
        <Image style={styles.poster}
               source={{uri : `https://image.tmdb.org/t/p/w500${poster_path}`}}
               defaultSource={require('../Images/default_thumbnail.png')} />

        <View style={styles.info}>
          <View style={styles.intro}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <View style={styles.iconWrapper}>
              <Text style={styles.rating}>{vote_average}</Text>
              <Icon name="star" size={14} color="#000" />
            </View>

          </View>

          <View style={styles.meta}>
            <View style={styles.iconWrapper}>
              <Icon name="calendar" size={12} color="#000" />
              <Text style={styles.releaseDate}>{release_date}</Text>
            </View>
            {/*<Text style={styles.genres}>Animation, Comedy, Drama</Text>*/}
          </View>

          <Text
            style={styles.description}
            numberOfLines={4}
            ellipsizeMode={'tail'}>{overview}</Text>
        </View>
      </View>

    </Wrapper>
  )
};

const styles = StyleSheet.create({
  container: {

  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    elevation: 2,
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
  },
  poster: {
    width: 114,
    height: null,
    resizeMode: 'cover'
  },
  info: {
    flex: 1,
    width: 0,
    padding: 8,
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
    // fontFamily: 'Source Sans Pro'
  },
  rating: {
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 4,
    // fontFamily: 'Source Sans Pro'
  },
  meta: {
    marginTop: 4,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  releaseDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  genres: {
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 4,
    // fontFamily: 'Source Sans Pro'
  },
  description: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 12,
    // fontFamily: 'Source Sans Pro'
  }

});

export default MovieItem;
