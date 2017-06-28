import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';
import StarRating from 'react-native-star-rating';

import {AppColors} from '../Styles/index';

const Item = (props) => {
  const {
    name, image_url, location
  } = props;
  //const borderBottomColor = (error ? 'red' : AppColors.colorSecondaryText);

  const Wrapper = Platform.select({
    ios: () => require('TouchableHighlight'),
    android: () => require('TouchableNativeFeedback'),
  })();

  const address = (location) => {
    return location.display_address;
  };

  return (
    <Wrapper
      activeOpacity={0.5}
      underlayColor="transparent"
      onPress={() => {
      }}>
      <View style={[styles.container, styles.card]}>
        <View style={styles.thumbnailWrapper}>
          <Image
            style={styles.thumbnail}
            source={{uri : image_url}}/>
        </View>

        <View style={styles.info}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.date}>15min</Text>
          </View>
          <View style={[styles.titleWrapper, styles.ratingWrapper]}>
            <StarRating
              starSize={20}
              disabled={false}
              maxStars={5}
              rating={3.5}
              starColor={AppColors.colorPrimary}
              selectedStar={(rating) => {
              }}
            />
            <Text style={styles.date}>12000 reviews</Text>
          </View>
          <Text style={styles.address}>{address(location)}</Text>
          <Text style={styles.kind}>Fish, meat, carrot, rice ...</Text>
        </View>
      </View>
    </Wrapper>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    marginTop: 16,
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
  thumbnailWrapper: {
    width: 120,
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: null,
  },
  info: {
    flex: 1,
    padding: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  date: {
    fontSize: 12,
  },
  ratingWrapper: {
    marginTop: 4,
    alignItems: 'baseline',
  },
  address: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginTop: 8,
  },
  kind: {
    fontSize: 14,
    marginTop: 8,
  }

});

export default Item;
