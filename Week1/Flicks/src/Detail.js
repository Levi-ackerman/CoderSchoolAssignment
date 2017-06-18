import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Detail extends Component {

  render() {
    const {title, vote_average, poster_path, release_date, overview } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          source={{uri : `https://image.tmdb.org/t/p/w500${poster_path}`}}
          style={{flex: 1}}>
          <View style={{flex: 1}}/>
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.releaseDate}>{release_date}</Text>
            <Text style={styles.releaseDate}>{vote_average}</Text>
            <Text numberOfLines={3} style={styles.overview}>{overview}</Text>
          </View>

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
  },
  releaseDate: {
    color: '#FFF',
    fontSize: 20,
  },
  overview: {
    color: '#FFF',
    fontSize: 18,
  }
});
