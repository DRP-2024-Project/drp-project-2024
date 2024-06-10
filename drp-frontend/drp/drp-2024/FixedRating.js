import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-ratings';

export default function FixedRating({ rating }) {
  return (
    <View style={styles.container}>
      <Rating
        readonly
        startingValue={rating}
        imageSize={30}
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    marginTop: 10,
  },
});