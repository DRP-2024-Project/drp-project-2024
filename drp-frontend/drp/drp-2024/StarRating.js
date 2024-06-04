import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Icon
        key={i}
        name={i <= rating ? 'star' : 'star-o'}
        size={20}
        color="#FFD700"
        style={styles.star}
      />
    );
  }

  return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default StarRating;